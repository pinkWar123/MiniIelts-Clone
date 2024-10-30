using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models.Listening;
using MiniIeltsCloneServer.Repositories;

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
    }
}