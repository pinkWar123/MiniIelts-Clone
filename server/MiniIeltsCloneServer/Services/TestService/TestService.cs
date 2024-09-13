using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Data.Repositories.TestRepo;
using MiniIeltsCloneServer.Exceptions.Test;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Answer;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Services.AnswerService;
using MiniIeltsCloneServer.Services.UserService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.TestService
{
    public class TestService : GenericService, ITestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITestRepository _testRepo;
        private readonly IAnswerService _answerService;
        private readonly IUserService _userService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TestService(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            ITestRepository testRepo,
            IAnswerService answerService,
            IUserService userService,
            UserManager<AppUser> userManager,
            IHttpContextAccessor httpContextAccessor
            ) : base(mapper)
        {
            _unitOfWork = unitOfWork;
            _answerService = answerService;
            _testRepo = testRepo;
            _userService = userService;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task CreateTestAsync(CreateTestDto createTestDto)
        {
            using (var transaction = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    Console.WriteLine(createTestDto);
                    var test = _mapper.Map<Test>(createTestDto);
                    test.CreatedOn = DateTime.UtcNow;
                    var user = await _userService.GetCurrentUser();
                    test.AppUserId = user?.Id;
                    await _unitOfWork.TestRepository.AddAsync(test);
                    await _unitOfWork.SaveChangesAsync();
                    await _unitOfWork.CommitAsync();
                }
                catch (System.Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<PagedData<TestViewDto>?> GetAllTestsAsync(TestQueryObject queryObject)
        {
            var tests = _unitOfWork.TestRepository.GetValuesByQuery(queryObject);
            if (tests == null) return null;
            var testCount = await tests.CountAsync();
            var res = await
            tests
                .Include(x => x.Excercises)
                    .ThenInclude(x => x.ChooseManyChoices)
                .Include(x => x.Excercises)
                    .ThenInclude(x => x.Questions)
                        .ThenInclude(x => x.Choices)
                // .Select(x => _mapper.Map<TestViewDto>(x))
                .ToListAsync();
            return new PagedData<TestViewDto>
            {
                Value = res.Select(x => _mapper.Map<TestViewDto>(x)).ToList(),
                TotalRecords = testCount
            }; 
        }

        public async Task<PagedData<TestSearchViewDto>> GetAllTestSearch(TestQueryObject queryObject)
        {
            var result = await _testRepo.GetTestSearchViews(queryObject);
            return new PagedData<TestSearchViewDto>
            {
                TotalRecords = result.TotalRecords,
                Value = result.Value.Select(r => _mapper.Map<TestSearchViewDto>(r)).ToList()
            };
        }

        public async Task<TestViewDto?> GetTestById(int id)
        {
            var test = await _unitOfWork.TestRepository.GetByIdAsync(id);
            if(test == null) return null;
            return _mapper.Map<TestViewDto>(test);           
        }

        public double GetTestMark(int correct, int questionCount)
        {
            var diff = questionCount - correct;
            return 9 - 0.5 * diff;
        }

        public async Task<TestResultDto?> GetTestResult(int testId, TestSubmitDto testSubmitDto)
        {
            var test = await _unitOfWork.TestRepository.GetByIdAsync(testId);
            if(test == null) throw new TestNotFoundException($"Test with id {testId} was not found");

            var questions = new List<Question>();

            foreach(var exercise in test.Excercises)
            {
                questions.AddRange(exercise.Questions);
            }

            if(testSubmitDto.QuestionSubmitDtos.Count != questions.Count)
                return null;

            var testResultDto = new TestResultDto
            {
                Title = test.Title,
                QuestionCount = test.QuestionCount,
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
                    IsTrue = question?.Answer?.ToLower().Trim() == testSubmitDto.QuestionSubmitDtos[i].Value.ToLower().Trim()
                });
            }

            var correct = testResultDto.QuestionResults.Where(q => q.IsTrue).Count();
            var incorrect = testResultDto.QuestionCount - correct - testResultDto.Unanswered;

            testResultDto.Correct = correct;
            testResultDto.Incorrect= incorrect;
            testResultDto.Marks = GetTestMark(correct, test.QuestionCount);

            return testResultDto;
        }

        public async Task IncrementTestViewCount(int testId)
        {
            var test = await _unitOfWork.TestRepository.GetByIdAsync(testId);
            if(test == null) throw new TestNotFoundException($"Can't find test with id ${testId}");
            test.ViewCount++;
            await _unitOfWork.TestRepository.UpdateAsync(testId, test);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<TestSubmitResultDto?> SubmitTest(int testId, TestSubmitDto testSubmitDto)
        {
            var result = await GetTestResult(testId, testSubmitDto);
            var userName = _httpContextAccessor?.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(userName == null)
            {
                throw new UnauthorizedAccessException();
            }

            var user = await _userManager.FindByNameAsync(userName);
            if(user == null)
            {
                throw new UnauthorizedAccessException();
            }

            using (var transaction = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {

                    var testResult = new Result
                    {
                        TestId = testId,
                        Score = result?.Marks ?? 0,
                        CreatedOn = DateTime.UtcNow,
                        CreatedBy = userName,
                        AppUserId = user.Id,
                        Time = testSubmitDto.Time
                        
                    };
                    await _unitOfWork.ResultRepository.AddAsync(testResult);
                    await _unitOfWork.SaveChangesAsync();
                    var answers = new List<Answer>();
                    foreach(var questionSubmitDto in testSubmitDto.QuestionSubmitDtos)
                    {
                        var createAnswerDto = new CreateAnswerDto
                        {
                            IsCorrect = result?.QuestionResults?.FirstOrDefault(x => x.Order == questionSubmitDto.Order)?.IsTrue ?? false,
                            Value = questionSubmitDto.Value,
                            ResultId = testResult.Id,
                            QuestionType = questionSubmitDto.QuestionType,
                            CreatedOn = DateTime.UtcNow,
                            CreatedBy = userName,
                            AppUserId = user.Id

                        };
                        await _answerService.CreateNewAnswer(createAnswerDto);
                    }


                    await _unitOfWork.SaveChangesAsync();
                    await _unitOfWork.CommitAsync();
                    await IncrementTestViewCount(testId);
                    return new TestSubmitResultDto
                    {
                        ResultId = testResult.Id,
                    } ;
                }
                catch (System.Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }

            
        }
    }
}
