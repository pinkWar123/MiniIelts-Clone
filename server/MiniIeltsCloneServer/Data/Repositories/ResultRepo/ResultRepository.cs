using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Data.Repositories.TestRepo;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Models.Dtos.Question;
using MiniIeltsCloneServer.Models.Dtos.Result;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.DashboardService;
using MiniIeltsCloneServer.Services.TestService;

namespace MiniIeltsCloneServer.Data.Repositories.ResultRepo
{
    public class ResultRepository : GenericRepository<Result>, IResultRepository
    {
        public ResultRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }


        public async Task<Performance> GetOverallResult(string userId)
        {
            var performance = await GetContext()
            .Where(p => p.AppUserId == userId)
            .GroupBy(p => p.AppUserId)
            .Select(g => new Performance {
                TestCount = g.Count(),
                AverageScore = g.Average(u => (double)u.Score)
            })
            .FirstOrDefaultAsync();

            return performance;
        }

        public async Task<List<QuestionStatistics>> GetQuestionStatistics(string userId)
        {
            var query = from result in _context.Results
                        where result.AppUserId == userId
                        join answer in _context.Answers
                        on result.Id equals answer.ResultId
                        group new { result, answer } by answer.QuestionType into newAnswer
                        select new QuestionStatistics
                        {
                            QuestionType = newAnswer.Key,
                            Accuracy = (double) newAnswer.Count(n => n.answer.IsCorrect) / newAnswer.Count()
                        };
                        
            return await query.ToListAsync();
            // throw new NotImplementedException();
        }

        public async Task<TestResultDto> GetResultById(int resultId)
        {
            var query = from result in _context.Results
            where result.Id == resultId
            join test in _context.Tests on result.TestId equals test.Id
            join exercise in _context.Excercises on test.Id equals exercise.TestId
            join question in _context.Questions on exercise.Id equals question.ExerciseId
            select new 
            {
                result,
                test,
                question,
                result.Answers
            };

            // Execute the query up to this point and bring the data into memory
            var data = await query.AsNoTracking().FirstOrDefaultAsync();

            // Now do the complex logic on the client side
            if (data != null)
            {
                var testResultDto = new TestResultDto
                {
                    TestId = data.test.Id,
                    Title = data.test.Title,
                    Marks = data.result.Score,
                    QuestionCount = data.Answers.Count(),
                    Correct = data.Answers.Count(a => a.IsCorrect),
                    Incorrect = data.Answers.Count(a => !string.IsNullOrEmpty(a.Value) && !a.IsCorrect),
                    Unanswered = data.Answers.Count(a => string.IsNullOrEmpty(a.Value)),
                    QuestionResults = data.Answers.Select((answer, index) => new QuestionResultDto
                    {
                        Order = index + 1,
                        UserAnswer = answer.Value,
                        Answer = data.question.Answer,  // Handle multiple questions if needed
                        IsTrue = answer.IsCorrect
                    }).ToList()
                };

                return testResultDto;
            }

            return null;

        }

        public async Task<List<TestHistory>> GetTestHistory(string userId, DashboardQueryObject @object)
        {
            var query = (from result in _context.Results
                            where result.AppUserId == userId
                            join test in _context.Tests
                            on result.TestId equals test.Id
                            orderby result.CreatedOn descending
                            select new TestHistory
                            {
                                TestTitle = test.Title ?? "",
                                Score = result.Score,
                                Time = 0,
                                TestTakenDate = result.CreatedOn,
                                ResultId = result.Id
                            })
                            .Skip(@object.PageSize * (@object.PageNumber - 1))
                            .Take(@object.PageSize);
            
            var history = await query.ToListAsync();
            return history;
        }

        
    }
}