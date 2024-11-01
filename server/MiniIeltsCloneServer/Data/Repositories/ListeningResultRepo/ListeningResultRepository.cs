using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Models.Listening;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.DashboardService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.ListeningResultRepo
{
    public class ListeningResultRepository : GenericRepository<ListeningResult>, IListeningResultRepository
    {
        public ListeningResultRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public override async Task<ListeningResult?> GetByIdAsync(int id)
        {
            return await GetContext()
                .Include(lr => lr.ListeningTest)
                    .ThenInclude(lt => lt.ListeningParts)
                        .ThenInclude(lp => lp.ListeningExercises)
                            .ThenInclude(le => le.Questions)
                .Include(lr => lr.Answers)
                .FirstOrDefaultAsync(lr => lr.Id == id);
        }

        public async Task<PagedData<TestHistory>> GetListeningTestHistory(string userId, DashboardQueryObject @object)
        {
            var query = (from result in _context.ListeningResults
                            where result.AppUserId == userId
                            orderby result.CreatedOn descending
                            select new TestHistory
                            {
                                TestTitle = result.ListeningTest.Title ?? "",
                                TestId = result.ListeningTestId,
                                Score = result.Score,
                                Time = result.Time,
                                TestTakenDate = result.CreatedOn,
                                ResultId = result.Id
                            })
                            .Skip(@object.PageSize * (@object.PageNumber - 1))
                            .Take(@object.PageSize);
            
            var history = await query.ToListAsync();
            var historyCount = await query.CountAsync();
            return new PagedData<TestHistory>
            {
                TotalRecords = historyCount,
                Value = history
            };
        }

        public async Task<List<QuestionStatistics>> GetQuestionStatistics(string userId)
        {
            var query = from result in _context.ListeningResults
                        where result.AppUserId == userId
                        join answer in _context.Answers
                        on result.Id equals answer.ListeningResultId
                        group new { result, answer } by answer.QuestionType into newAnswer
                        select new QuestionStatistics
                        {
                            QuestionType = newAnswer.Key,
                            Accuracy = (double) newAnswer.Count(n => n.answer.IsCorrect) / newAnswer.Count()
                        };
                        
            return await query.ToListAsync();
            // throw new NotImplementedException();
        }
    }

    
}