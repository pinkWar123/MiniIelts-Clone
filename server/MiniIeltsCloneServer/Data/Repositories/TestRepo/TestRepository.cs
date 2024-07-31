using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.TestRepo
{
    public class TestRepository : GenericRepository<Test>, ITestRepository
    {
        public TestRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            
        }

        public override async Task<Test?> GetByIdAsync(int id)
        {
            var test = await GetContext().AsQueryable()
            .Include(x => x.Excercises)
                    .ThenInclude(x => x.ChooseManyChoices)
                .Include(x => x.Excercises)
                    .ThenInclude(x => x.Questions)
                        .ThenInclude(x => x.Choices).FirstOrDefaultAsync(x => x.Id == id);
            return test;
        }
    }
}
