using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

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
    }
}