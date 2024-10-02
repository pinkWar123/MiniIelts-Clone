using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Exceptions.FullTest;
using MiniIeltsCloneServer.Exceptions.FullTestResult;
using MiniIeltsCloneServer.Exceptions.Test;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Models.Dtos.Question;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Services.FullTestResultService;
using MiniIeltsCloneServer.Services.TestService;
using MiniIeltsCloneServer.Services.UserService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.FullTestService
{
    public class FullTestService : IFullTestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITestService _testService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IFullTestResultService _fullTestResultService;
        
        public FullTestService(IUnitOfWork unitOfWork, 
        IMapper mapper, 
        ITestService testService, 
        IUserService userService,
        IFullTestResultService fullTestResultService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _testService = testService;
            _userService = userService;
            _fullTestResultService = fullTestResultService;
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

        public async Task DeleteFullTestById(int id)
        {
            var fullTest = await _unitOfWork.FullTestRepository.GetByIdAsync(id);
            if(fullTest == null) throw new FullTestNotFoundException(id);
            _unitOfWork.FullTestRepository.Remove(fullTest);
            await _unitOfWork.SaveChangesAsync();
        }

        public double GetBandScore(int correct)
        {
            if(correct > 40 || correct < 0) throw new BadHttpRequestException("Number of correct answers is invalid");
            if(correct == 0) return 1;
            if(correct == 1) return 1.5;
            if(correct == 2) return 2;
            if(correct >= 3 && correct <= 4) return 2.5;
            if(correct >= 5 && correct <= 6) return 3;
            if(correct >= 7 && correct <= 9) return 3.5;
            if(correct >= 10 && correct <= 12) return 4;
            if(correct >= 13 && correct <= 15) return 4.5;
            if(correct >= 16 && correct <= 19) return 5;
            if(correct >= 20 && correct <= 22) return 5.5;
            if(correct >= 23 && correct <= 26) return 6;
            if(correct >= 27 && correct <= 29) return 6.5;
            if(correct >= 30 && correct <= 32) return 7;
            if(correct >= 33 && correct <= 34) return 7.5;
            if(correct >= 35 && correct <= 36) return 8;
            if(correct >= 37 && correct <= 38) return 8.5;
            if(correct >= 39 && correct <= 40) return 9;
            return 2;
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

        public async Task<FullTestResultDto> GetFullTestResult(int fullTestId, SubmitFullTestDto dto)
        {
            var fullTest = await _unitOfWork.FullTestRepository.GetByIdAsync(fullTestId);
            if(fullTest == null) throw new FullTestNotFoundException(fullTestId);
            
            var offset = 0;
            var testResults = new List<Models.Dtos.Test.TestResultDto>();
            var resultIds = new List<int>();
            for (var i = 0; i < fullTest.Tests.Count; i++)
            {
                var test = fullTest.Tests[i];
                var questions = dto.Answers.Skip(offset).Take(test.QuestionCount).ToList();
                questions.ForEach(q => q.Order -= offset);
                var result = new Models.Dtos.Test.TestResultDto {Title = ""};
                
                var testResult = await _testService.GetTestResult(test.Id, new TestSubmitDto {QuestionSubmitDtos = questions});
                if(testResult != null)
                {
                    testResults.Add(testResult);
                }
                offset += test.QuestionCount;
            }

            var correct = testResults.Sum(r => r.Correct);
            var part = 1;
            offset = 1;
            var results = new List<Models.Dtos.FullTest.TestResultDto>();
            testResults.ForEach(result =>
            {

                var testResultDto = new Models.Dtos.FullTest.TestResultDto
                {
                    Part = part++,
                    StartQuestion = offset,
                    EndQuestion = offset + result.QuestionCount - 1,
                    QuestionResults = result.QuestionResults.Select(a => new QuestionResultDto
                    {
                        UserAnswer = a.UserAnswer,
                        IsTrue = a.IsTrue,
                        Order = offset++,
                        Answer = a.Answer // Avoid IndexOutOfRangeException
                    }).ToList()
                };
                results.Add(testResultDto);
            });
            var fullTestResult = new FullTestResultDto
            {
                Title = fullTest.Title,
                FullTestId = fullTestId,
                Marks = GetBandScore(correct),
                Correct = correct,
                QuestionCount = testResults.Sum(r => r.QuestionCount),
                Time = dto.Time,
                CreatedOn = DateTime.UtcNow,
                Results = results
            };
            var _results = await _unitOfWork.ResultRepository.FindAllAsync(r => resultIds.Contains(r.Id));
            if(_results == null) throw new BadHttpRequestException("Could not find results");
            
            return fullTestResult;
        }

        public async Task<FullTestResultDto> GetFullTestResultById(int id)
        {
            var fullTestResult = await _unitOfWork.FullTestResultRepository.GetByIdAsync(id);
            if (fullTestResult == null) throw new FullTestResultNotFoundException(id);

            // Ensure FullTest and Tests are loaded
            if (fullTestResult.FullTest?.Tests == null || !fullTestResult.FullTest.Tests.Any())
                throw new Exception("No tests found in FullTest.");

            var results = new List<Models.Dtos.FullTest.TestResultDto>();
            var part = 1;
            var order = 1;
            
            var questions = fullTestResult.FullTest.Tests
                .SelectMany(t => t.Excercises?.SelectMany(e => e.Questions)?.ToList() ?? new List<Question>())
                .ToList();

            if (questions == null || !questions.Any())
                throw new Exception("No questions found in tests.");

            var keys = questions.Select(q => q.Answer).ToList();
            if (keys.Count != fullTestResult.QuestionCount)
                throw new FullTestResultConflictLengthException(id);

            fullTestResult.Results.ForEach(result =>
            {
                if (result?.Test == null || result.Answers == null) 
                    throw new Exception("Test or Answers are null for a result.");

                var testResultDto = new Models.Dtos.FullTest.TestResultDto
                {
                    Part = part++,
                    StartQuestion = order,
                    EndQuestion = order + result.Test.QuestionCount - 1,
                    QuestionResults = result.Answers.Select(a => new QuestionResultDto
                    {
                        UserAnswer = a.Value,
                        IsTrue = a.IsCorrect,
                        Order = order++,
                        Answer = keys.ElementAtOrDefault(order - 2) // Avoid IndexOutOfRangeException
                    }).ToList()
                };
                results.Add(testResultDto);
            });

            return new FullTestResultDto
            {
                FullTestId = fullTestResult.FullTestId,
                Id = fullTestResult.Id,
                Title = fullTestResult.Title,
                Marks = fullTestResult.Marks,
                Correct = fullTestResult.Correct,
                QuestionCount = fullTestResult.QuestionCount,
                Time = fullTestResult.Time,
                Results = results,
                CreatedOn = fullTestResult.FullTest.CreatedOn,
                ViewCount = fullTestResult.FullTest.ViewCount
            };
        }


        public async Task<PagedData<FullTestViewDto>> GetFullTests(FullTestQueryObject @object)
        {
            var fullTests = await _unitOfWork.FullTestRepository.GetFullTests(@object);
            var values = fullTests.Value.Select(f => new FullTestViewDto
            {
                Title = f.Title,
                Tests = f.Tests.Select(t => _mapper.Map<TestViewDto>(t)).ToList(),
                CreatedOn = f.CreatedOn,
                Id = f.Id
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

        public async Task IncrementViewCount(int fullTestId)
        {
            var fullTest = await _unitOfWork.FullTestRepository.GetByIdAsync(fullTestId);
            if(fullTest == null) throw new FullTestNotFoundException(fullTestId);
            fullTest.ViewCount++;
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> SubmitFullTest(int fullTestId, SubmitFullTestDto dto)
        {
            var currentUser = await _userService.GetCurrentUser();
            if(currentUser == null) throw new UnauthorizedAccessException();
            var fullTest = await _unitOfWork.FullTestRepository.GetByIdAsync(fullTestId);
            if(fullTest == null) throw new FullTestNotFoundException(fullTestId);
            fullTest.ViewCount++;
            
            var offset = 0;
            var testResults = new List<Models.Dtos.Test.TestResultDto>();
            var resultIds = new List<int>();
            for (var i = 0; i < fullTest.Tests.Count; i++)
            {
                var test = fullTest.Tests[i];
                var questions = dto.Answers.Skip(offset).Take(test.QuestionCount).ToList();
                questions.ForEach(q => q.Order -= offset);
                var result = new Models.Dtos.Test.TestResultDto {Title = ""};
                
                var testResult = await _testService.SubmitTest(test.Id, new TestSubmitDto {QuestionSubmitDtos = questions});
                if(testResult != null)
                {
                    result = testResult.Result;
                    resultIds.Add(testResult.ResultId);
                }
                testResults.Add(result);
                offset += test.QuestionCount;
            }

            var correct = testResults.Sum(r => r.Correct);

            
                var fullTestResult = new FullTestResult
                {
                    Title = fullTest.Title,
                    FullTestId = fullTestId,
                    Marks = GetBandScore(correct),
                    Correct = correct,
                    QuestionCount = testResults.Sum(r => r.QuestionCount),
                    Time = dto.Time,
                    CreatedOn = DateTime.UtcNow,
                    AppUserId = currentUser.Id,
                    CreatedBy = currentUser.UserName
                };
                await _unitOfWork.FullTestResultRepository.AddAsync(fullTestResult);
                await _unitOfWork.SaveChangesAsync();
                var _results = await _unitOfWork.ResultRepository.FindAllAsync(r => resultIds.Contains(r.Id));
                if(_results == null) throw new BadHttpRequestException("Could not find results");
                
                foreach(var _result in _results)
                {
                    _result.FullTestResultId = fullTestResult.Id;
                }

                await _unitOfWork.SaveChangesAsync();
                return fullTestResult.Id;
        }
    }
}