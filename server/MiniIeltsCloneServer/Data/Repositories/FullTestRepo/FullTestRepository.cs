using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.FullTestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.FullTestRepo
{
    public class FullTestRepository : GenericRepository<FullTest>, IFullTestRepository
    {
        private readonly IMapper _mapper;
        public FullTestRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public override async Task<FullTest?> GetByIdAsync(int id)
        {
            var test = await GetContext()
            .Include(f => f.Tests)
                .ThenInclude(x => x.Excercises)
                    .ThenInclude(x => x.ChooseManyChoices)
            .Include(x => x.Tests)
                .ThenInclude(x => x.Excercises)
                    .ThenInclude(x => x.Questions)
                        .ThenInclude(x => x.Choices)
            .FirstOrDefaultAsync(x => x.Id == id);
            return test;
        }

        public async Task<PagedData<FullTest>> GetFullTests(FullTestQueryObject @object)
        {
            var query = _context.FullTests.AsQueryable();
            
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

            return new PagedData<FullTest>
            {
                TotalRecords = totalRecords,
                Value = values
            };
        }
    }
}