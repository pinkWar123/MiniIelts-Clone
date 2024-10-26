using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Series;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.SeriesService;
using MiniIeltsCloneServer.Wrappers;
using Newtonsoft.Json;

namespace MiniIeltsCloneServer.Data.Repositories.SeriesRepo
{
    public class SeriesRepository : GenericRepository<Series>, ISeriesRepository
    {
        public SeriesRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            
        }

        public override async Task<Series?> GetByIdAsync(int id)
        {
            return await GetContext()
                .Include(s => s.SeriesFullTests.OrderBy(sf => sf.FullTestOrder))
                    .ThenInclude(sf => sf.FullTest)
                .Include(s =>  s.SeriesListeningTests.OrderBy(sft => sft.ListeningTestOrder))
                    .ThenInclude(slt => slt.ListeningTest)
                .Where(s => s.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<PagedData<Series>> GetAllSeries(SeriesQueryObject seriesQueryObject)
        {
            var query = _context.Series.AsQueryable();

            var title = seriesQueryObject.Title;

            if(!String.IsNullOrEmpty(title))
            {
                query = query.Where(s => s.Title.ToLower().Trim().Contains(title.ToLower().Trim()));
            }

            var count = await query.CountAsync();
            var skill = seriesQueryObject.Skill;
            if(!String.IsNullOrEmpty(skill))
            {
                if(skill.ToLower().Trim() == "Listening".ToLower().Trim())
                {
                    query = query.Include(s => s.SeriesListeningTests.OrderBy(sf => sf.ListeningTestOrder))
                        .ThenInclude(sf => sf.ListeningTest);
                }
                else if(skill.ToLower().Trim() == "Reading".ToLower().Trim())
                {
                    query = query.Include(s => s.SeriesFullTests.OrderBy(sf => sf.FullTestOrder))
                        .ThenInclude(sf => sf.FullTest);
                }
                else if(skill.ToLower().Trim() == "All".ToLower().Trim())
                {
                    query = query
                        .Include(s => s.SeriesListeningTests.OrderBy(sf => sf.ListeningTestOrder))
                            .ThenInclude(sf => sf.ListeningTest)
                        .Include(s => s.SeriesFullTests.OrderBy(sf => sf.FullTestOrder))
                            .ThenInclude(sf => sf.FullTest);
                }
            }
            
            if(!String.IsNullOrEmpty(seriesQueryObject.Sort))
            {
                switch (seriesQueryObject.Sort)
                {
                    case "high-ranking":
                        // query = query.OrderBy(q => q.);
                        break;
                    case "newest":
                        query = query.OrderByDescending(q => q.CreatedOn);
                        break;
                    default:
                        query = query.OrderBy(q => q.CreatedOn);
                        break;
                }
            }

            var data = await query
                .Skip((seriesQueryObject.PageNumber - 1) * seriesQueryObject.PageSize)
                .Take(seriesQueryObject.PageSize)
                .ToListAsync();

            return new PagedData<Series>
            {
                TotalRecords = count,
                Value = data
            };
        }
    }
}