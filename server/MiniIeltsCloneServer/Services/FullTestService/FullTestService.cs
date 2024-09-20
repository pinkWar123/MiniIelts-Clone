using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Exceptions.FullTest;
using MiniIeltsCloneServer.Exceptions.Test;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Models.Dtos.Question;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Services.TestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.FullTestService
{
    public class FullTestService : IFullTestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITestService _testService;
        private readonly IMapper _mapper;
        
        public FullTestService(IUnitOfWork unitOfWork, IMapper mapper, ITestService testService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _testService = testService;
        }
        public async Task CreateFullTest(CreateFullTestDto dto)
        {
            using (var transaction = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var newFullTest = new FullTest
                    {
                        Title = dto.Title,
                        CreatedOn = DateTime.UtcNow
                    };

                    await _unitOfWork.FullTestRepository.AddAsync(newFullTest);
                    await _unitOfWork.SaveChangesAsync();

                    foreach(var testId in dto.TestIds)
                    {
                        var test = await _unitOfWork.TestRepository.GetByIdAsync(testId);
                        if(test == null)
                        {
                            throw new TestNotFoundException($"Test with id {testId} not found");
                        }
                        test.FullTestId = newFullTest.Id;
                    }
                    await _unitOfWork.SaveChangesAsync();
                    await _unitOfWork.CommitAsync();
                }
                catch (Exception)
                {
                    await _unitOfWork.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<FullTestViewDto> GetFullTestById(int id)
        {
            var fullTest = await _unitOfWork.FullTestRepository.GetByIdAsync(id);
            if(fullTest == null) throw new FullTestNotFoundException(id);
            return _mapper.Map<FullTestViewDto>(fullTest);
        }

        public async Task<FullTestKeyDto> GetFullTestKey(int fullTestId)
        {
            var fullTest = await _unitOfWork.FullTestRepository.GetByIdAsync(fullTestId);
            if(fullTest == null) throw new FullTestNotFoundException(fullTestId);
            
            var part = 1;
            var offset = 0;
            var testKeys = fullTest.Tests.Select(t =>
            {
                var dto = new TestKeyDto
                {
                    Part = part++,
                    StartQuestion = offset + 1,
                    EndQuestion = offset + t.QuestionCount,
                    Keys = t.Excercises.SelectMany(e => e.Questions).Select(q => new QuestionKeyDto
                    {
                        Order = q.Order + offset,
                        Answer = q.Answer
                    }).ToList() 
                };
                offset += t.QuestionCount;
                return dto;
            }).ToList();

            return new FullTestKeyDto
            {
                FullTestId = fullTestId,
                Title = fullTest.Title,
                QuestionCount = fullTest.Tests.Sum(t => t.QuestionCount),
                TestKeys = testKeys
            };
        }

        public async Task<PagedData<FullTestViewDto>> GetFullTests(FullTestQueryObject @object)
        {
            var fullTests = await _unitOfWork.FullTestRepository.GetFullTests(@object);
            var values = fullTests.Value.Select(f => new FullTestViewDto
            {
                Title = f.Title,
                Tests = f.Tests.Select(t => _mapper.Map<TestViewDto>(t)).ToList(),
                CreatedOn = f.CreatedOn
            }).ToList();

            return new PagedData<FullTestViewDto>
            {
                Value = values,
                TotalRecords = fullTests.TotalRecords
            };
        }

        public async Task<bool> HasNameExisted(string name)
        {
            var fullTests = await _unitOfWork.FullTestRepository.FindAllAsync(f => f.Title == name);
            if(fullTests == null || fullTests.Count == 0) return false;
            return true;
        }

        public async Task<FullTestResultDto> SubmitFullTest(int fullTestId, SubmitFullTestDto dto)
        {
            var fullTest = await _unitOfWork.FullTestRepository.GetByIdAsync(fullTestId);
            if(fullTest == null) throw new FullTestNotFoundException(fullTestId);
            
            var offset = 0;
            var testResults = new List<Models.Dtos.Test.TestResultDto>();
            for (var i = 0; i < fullTest.Tests.Count; i++)
            {
                var test = fullTest.Tests[i];
                var questions = dto.Answers.Skip(offset).Take(test.QuestionCount).ToList();
                questions.ForEach(q => q.Order -= offset);
                var result = await _testService.GetTestResult(test.Id, new TestSubmitDto {QuestionSubmitDtos = questions});
                testResults.Add(result);
                offset += test.QuestionCount;
            }

            var results = new List<Models.Dtos.FullTest.TestResultDto>();
            offset = 0;
            var currentPart = 1;

            testResults.ForEach(t => {
                results.Add(new Models.Dtos.FullTest.TestResultDto
                {
                    Part = currentPart++,
                    StartQuestion = offset + 1,
                    EndQuestion = offset + t.QuestionCount,
                    QuestionResults = t.QuestionResults.Select(q => new QuestionResultDto
                    {
                        UserAnswer = q.UserAnswer,
                        Answer = q.Answer,
                        IsTrue = q.IsTrue,
                        Order = q.Order + offset
                    }).ToList()
                });
                offset += t.QuestionCount;
            });


            return new FullTestResultDto
            {
                FullTestId = fullTestId,
                Title = fullTest.Title,
                Marks = 0,
                Correct = testResults.Sum(r => r.Correct),
                QuestionCount = testResults.Sum(r => r.QuestionCount),
                Results = results,
                Time = dto.Time
            };  


        }
    }
}