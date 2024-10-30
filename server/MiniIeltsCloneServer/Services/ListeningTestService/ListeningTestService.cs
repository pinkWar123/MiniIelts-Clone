using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using AutoMapper;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Exceptions.Test;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;
using MiniIeltsCloneServer.Models.Dtos.Question;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Services.FullTestService;
using MiniIeltsCloneServer.Extensions;
using MiniIeltsCloneServer.Wrappers;
using MiniIeltsCloneServer.Services.UserService;
using MiniIeltsCloneServer.Models.Listening;
using MiniIeltsCloneServer.Models.Dtos.Answer;
using MiniIeltsCloneServer.Services.AnswerService;
using MiniIeltsCloneServer.Exceptions.FullTestResult;

namespace MiniIeltsCloneServer.Services.ListeningTestService
{
    public class ListeningTestService : IListeningTestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IAnswerService _answerService;
        public ListeningTestService(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService, IAnswerService answerService)
        {
            _unitOfWork = unitOfWork;           
            _mapper = mapper;
            _userService = userService;
            _answerService = answerService;
        }
        public async Task CreateListeningTest(CreateListeningTestDto dto)
        {
            var listeningTest = _mapper.Map<CreateListeningTestDto, ListeningTest>(dto);
            await _unitOfWork.ListeningTestRepository.AddAsync(listeningTest);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<ListeningTestViewDto> GetListeningTestById(int id)
        {
            var test = await _unitOfWork.ListeningTestRepository.GetByIdAsync(id);
            return _mapper.Map<ListeningTestViewDto>(test);
        }

        public async Task<PagedData<ListeningDropDownDto>> GetListeningTests(ListeningTestQueryObject @object)
        {
            var listeningTests = await _unitOfWork.ListeningTestRepository.GetListeningTests(@object);
            var values = listeningTests.Value.Select(f => new ListeningDropDownDto
            {
                Title = f.Title,
                Id = f.Id
            }).ToList();

            return new PagedData<ListeningDropDownDto>
            {
                Value = values,
                TotalRecords = listeningTests.TotalRecords
            };
        }

        public async Task UpdateListeningTest(int id, UpdateListeningTestDto dto)
        {
            var test = await _unitOfWork.ListeningTestRepository.GetByIdAsync(id);
            if(test == null) throw new TestNotFoundException($"Can't find listening test with id {id}");

            test.Title = dto.Title;
            test.VideoId = dto.VideoId;
            test.ListeningParts = dto.ListeningParts.Select(lp => _mapper.Map<ListeningPart>(lp)).ToList();

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<ListeningTestKeyDto> GetListeningTestKey(int listeningTestId)
        {
            var listeningTest = await _unitOfWork.ListeningTestRepository.GetByIdAsync(listeningTestId);
            if(listeningTest == null) throw new TestNotFoundException($"Can't find test with id ${listeningTestId}");
            
            var part = 1;
            var offset = 0;
            var testKeys = listeningTest.ListeningParts.Select(t =>
            {
                var dto = new TestKeyDto
                {
                    Part = part,
                    StartQuestion = (part - 1) * 10 + 1,
                    EndQuestion = part * 10 - 1,
                    Keys = t.ListeningExercises.SelectMany(e => e.Questions).Select(q => new QuestionKeyDto
                    {
                        Order = q.Order + offset,
                        Answer = q.Answer
                    }).ToList(),
                };
                part++;
                return dto;
            }).ToList();

            return new ListeningTestKeyDto
            {
                ListeningTestId = listeningTestId,
                Title = listeningTest.Title,
                QuestionCount = 40,
                TestKeys = testKeys,
                VideoId = listeningTest.VideoId,
                Transcripts = listeningTest.ListeningParts.Select(lp => lp.Transcript).ToList()
            };
        }
    
        public async Task<Models.Dtos.Test.TestResultDto?> GetTestResult(int testId, TestSubmitDto testSubmitDto)
        {
            var test = await _unitOfWork.ListeningTestRepository.GetByIdAsync(testId);
            if(test == null) throw new TestNotFoundException($"Test with id {testId} was not found");

            var questions = test.ListeningParts.SelectMany(lp => lp.ListeningExercises.SelectMany(le => le.Questions)).ToList();

            if(testSubmitDto.QuestionSubmitDtos.Count != questions.Count)
                return null;

            var testResultDto = new Models.Dtos.Test.TestResultDto
            {
                Title = test.Title,
                QuestionCount = 40,
                Unanswered = testSubmitDto.QuestionSubmitDtos.Where(q => q.Value == "").Count()
            };
            if(questions == null)
                return null;
            for(var i = 0; i < questions.Count; i++)
            {
                var question = questions[i];
                
                testResultDto.QuestionResults.Add(new Models.Dtos.Question.QuestionResultDto
                {
                    Order = question.Order,
                    UserAnswer = testSubmitDto.QuestionSubmitDtos[i].Value.Trim(),
                    Answer = question?.Answer?.Trim() ?? "",
                    IsTrue = question?.Answer?.GenerateAnswerVariations().Contains(testSubmitDto.QuestionSubmitDtos[i].Value.ToLower().Trim()) ?? false
                });
            }

            var correct = testResultDto.QuestionResults.Where(q => q.IsTrue).Count();
            var incorrect = testResultDto.QuestionCount - correct - testResultDto.Unanswered;

            testResultDto.Correct = correct;
            testResultDto.Incorrect= incorrect;
            testResultDto.Marks = correct.GetListeningReadingTestScore();

            return testResultDto;
        }

        public async Task<int> SubmitTest(int testId, TestSubmitDto testSubmitDto)
        {
            var result = await GetTestResult(testId, testSubmitDto);
            var user = await _userService.GetCurrentUser();
            if(user == null)
            {
                throw new UnauthorizedAccessException();
            }

            using (var transaction = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var testResult = new ListeningResult
                    {
                        ListeningTestId = testId,
                        Score = result?.Marks ?? 0,
                        CreatedOn = DateTime.UtcNow,
                        CreatedBy = user.UserName,
                        AppUserId = user.Id,
                        Time = testSubmitDto.Time,         
                    };
                    await _unitOfWork.ListeningResultRepository.AddAsync(testResult);
                    await _unitOfWork.SaveChangesAsync();

                    var answers = new List<Answer>();
                    Console.WriteLine($"------------------${testResult.Id}------------------------");
                    foreach(var questionSubmitDto in testSubmitDto.QuestionSubmitDtos)
                    {
                        var createAnswerDto = new Answer
                        {
                            IsCorrect = result?.QuestionResults?.FirstOrDefault(x => x.Order == questionSubmitDto.Order)?.IsTrue ?? false,
                            Value = questionSubmitDto.Value,
                            QuestionType = questionSubmitDto.QuestionType,
                            CreatedOn = DateTime.UtcNow,
                            CreatedBy = user.UserName,
                            AppUserId = user.Id,
                            ListeningResultId = testResult.Id
                        };
                        answers.Add(createAnswerDto);
                    }

                    await _unitOfWork.AnswerRepository.AddRangeAsync(answers);
                    await _unitOfWork.SaveChangesAsync();
                    await _unitOfWork.CommitAsync();
                    return testResult.Id;
                }
                catch (System.Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<ListeningResultDto> GetListeningTestResultById(int id)
        {
            var listeningTestResult = await _unitOfWork.ListeningResultRepository.GetByIdAsync(id);
            if (listeningTestResult == null) throw new FullTestResultNotFoundException(id);


            var results = new List<Models.Dtos.FullTest.TestResultDto>();
            var part = 1;
            var order = 1;
            
            var questions = listeningTestResult.ListeningTest.ListeningParts
                .SelectMany(lp => lp.ListeningExercises)
                .SelectMany(le => le.Questions)
                .ToList();

            if (questions == null || !questions.Any())
                throw new Exception("No questions found in tests.");

            var keys = questions.Select(q => q.Answer).ToList();
            if (keys.Count != 40)
                throw new FullTestResultConflictLengthException(id);

            for(;part <= 4; part++)
            {
                var start = (part - 1) * 10 + 1;
                var testResultDto = new Models.Dtos.FullTest.TestResultDto
                {
                    Part = part,
                    StartQuestion = start,
                    EndQuestion = part * 10,
                    QuestionResults = listeningTestResult.Answers
                        .Slice(start - 1, 10)
                        .Select(answer => new QuestionResultDto
                        {
                            UserAnswer = answer.Value,
                            IsTrue = answer.IsCorrect,
                            Order = order++,
                            Answer = keys.ElementAtOrDefault(order - 1)
                        }).ToList()
                };

                results.Add(testResultDto);
            }

            return new ListeningResultDto
            {
                FullTestId = listeningTestResult.ListeningTestId,
                Id = listeningTestResult.Id,
                Title = listeningTestResult.ListeningTest.Title,
                Marks = listeningTestResult.Score,
                Correct = results.Sum(r => r.QuestionResults.Count(qs => qs.IsTrue)),
                QuestionCount = 40,
                Time = listeningTestResult.Time,
                Results = results,
                CreatedOn = DateTime.UtcNow,
                VideoId = listeningTestResult.ListeningTest.VideoId,
                Transcripts = listeningTestResult.ListeningTest.ListeningParts.Select(lp => lp.Transcript).ToList()
            };
        }
    }
}