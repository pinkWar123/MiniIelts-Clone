using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.ListeningTestService;
using MiniIeltsCloneServer.Wrappers;

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

        public async Task<PagedData<ListeningTest>> GetListeningTests(ListeningTestQueryObject @object)
        {
            var query = _context.ListeningTests.AsQueryable();
            
            if(!string.IsNullOrEmpty(@object.Title))
            {
                query = query.Where(f => f.Title.ToLower().Contains(@object.Title.ToLower()));
            }

            var orderBy = @object.OrderBy;

            if(!string.IsNullOrEmpty(orderBy))
            {
                if(orderBy == "newest")
                {
                    query = query.OrderByDescending(f => f.CreatedOn);
                }
                else if(orderBy == "popular")
                {
                    // Implement later
                }
            }

            var totalRecords = await query.CountAsync();

            var values = await query.
                            Skip(@object.PageSize * (@object.PageNumber - 1))
                            .Take(@object.PageSize)
                            .ToListAsync();

            return new PagedData<ListeningTest>
            {
                TotalRecords = totalRecords,
                Value = values
            };
        }
    }
}