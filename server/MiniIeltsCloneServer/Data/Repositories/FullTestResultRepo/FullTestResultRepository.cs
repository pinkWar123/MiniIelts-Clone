using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.DashboardService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.FullTestResultRepo
{
    public class FullTestResultRepository : GenericRepository<FullTestResult>, IFullTestResultRepository
    {
        public FullTestResultRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            
        }
        
        public override async Task<FullTestResult?> GetByIdAsync(int id)
        {
            var fullTest = await _context.FullTestResults
                .Include(f => f.Results)
                    .ThenInclude(r => r.Test)
                .Include(f => f.Results)
                    .ThenInclude(r => r.Answers)
                .Include(f => f.FullTest)
                    .ThenInclude(f => f.Tests)
                        .ThenInclude(t => t.Excercises)
                            .ThenInclude(e => e.Questions)
                .AsSplitQuery()
                .FirstOrDefaultAsync(f => f.Id == id);
            
            return fullTest;
        }

        public async Task<PagedData<TestHistory>> GetFullTestHistory(string userId, DashboardQueryObject @object)
        {
            var query = (from result in _context.FullTestResults
                            where result.AppUserId == userId
                            orderby result.CreatedOn descending
                            select new TestHistory
                            {
                                TestTitle = result.Title ?? "",
                                TestId = result.FullTestId,
                                Score = result.Marks,
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
    }
}