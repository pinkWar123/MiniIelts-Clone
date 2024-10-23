using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.ListeningTestRepo
{
    public class ListeningTestRepository : GenericRepository<ListeningTest>, IListeningTestRepository
    {
        public ListeningTestRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            
        }

        public override async Task<ListeningTest?> GetByIdAsync(int id)
        {
            var test = await GetContext().AsSplitQuery()
            .Include(x => x.ListeningParts)
                .ThenInclude(lp => lp.ListeningExercises)
                    .ThenInclude(le => le.ChooseManyChoices)
            .Include(x => x.ListeningParts)
                .ThenInclude(lp => lp.ListeningExercises)
                    .ThenInclude(le => le.Questions)
                        .ThenInclude(q => q.Choices)
            .FirstOrDefaultAsync(t => t.Id == id);
            return test;
        }
    }
}