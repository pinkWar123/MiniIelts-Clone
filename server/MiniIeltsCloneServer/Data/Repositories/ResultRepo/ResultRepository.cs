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
using MiniIeltsCloneServer.Wrappers;

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
            var test = await _context.Tests
                        .Include(t => t.Results)
                            .ThenInclude(r => r.Answers)
                        .Include(t => t.Excercises)
                            .ThenInclude(e => e.Questions)
                        .Where(t => t.Results.Any(r => r.Id == resultId))
                        .Select(t => new
                        {
                            t.Id,
                            t.Title,
                            Result = t.Results.FirstOrDefault(r => r.Id == resultId),
                            Questions = t.Excercises.SelectMany(e => e.Questions).ToList(),

                        })
                        .FirstOrDefaultAsync();
            Console.WriteLine($"Time: ${test?.Result?.Time}");
            // Now do the complex logic on the client side
            if (test != null)
            {
                var testResultDto = new TestResultDto
                {
                    TestId = test.Id,
                    Title = test.Title,
                    Marks = test.Result.Score,
                    QuestionCount = test.Questions.Count,
                    Correct = test.Result.Answers.Count(a => a.IsCorrect),
                    Incorrect = test.Result.Answers.Count(a => !string.IsNullOrEmpty(a.Value) && !a.IsCorrect),
                    Unanswered = test.Result.Answers.Count(a => string.IsNullOrEmpty(a.Value)),
                    QuestionResults = test.Result.Answers.Select((answer, index) => new QuestionResultDto
                    {
                        Order = index + 1,
                        UserAnswer = answer.Value,
                        Answer = test.Questions[index].Answer,  // Handle multiple questions if needed
                        IsTrue = answer.IsCorrect
                    }).ToList(),
                    Time = test.Result.Time
                };

                return testResultDto;
            }

            return null;

        }

        public async Task<PagedData<TestHistory>> GetTestHistory(string userId, DashboardQueryObject @object)
        {
            var historyCount = await _context.Results.Where(r => r.AppUserId == userId).CountAsync();
            var query = (from result in _context.Results
                            where result.AppUserId == userId
                            join test in _context.Tests
                            on result.TestId equals test.Id
                            orderby result.CreatedOn descending
                            select new TestHistory
                            {
                                TestTitle = test.Title ?? "",
                                Score = result.Score,
                                Time = result.Time,
                                TestTakenDate = result.CreatedOn,
                                ResultId = result.Id
                            })
                            .Skip(@object.PageSize * (@object.PageNumber - 1))
                            .Take(@object.PageSize);
            
            var history = await query.ToListAsync();
            return new PagedData<TestHistory>
            {
                TotalRecords = historyCount,
                Value = history
            };
        }

        
    }
}