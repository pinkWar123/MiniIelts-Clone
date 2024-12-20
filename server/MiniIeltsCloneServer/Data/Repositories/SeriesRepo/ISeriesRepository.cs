using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Series;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.SeriesService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.SeriesRepo
{
    public interface ISeriesRepository : IGenericRepository<Series>
    {
        Task<PagedData<Series>> GetAllSeries(SeriesQueryObject seriesQueryObject);
        Task<SeriesCollectionViewDto?> GetCollectionsBySeriesId(int seriesId);
        Task<PagedData<SeriesCollectionViewDto>> GetSeriesCollections(SeriesQueryObject query);
    }
}