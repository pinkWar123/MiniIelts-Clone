using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Series;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.SeriesService
{
    public interface ISeriesService
    {
        Task CreateNewSeries(CreateSeriesDto dto);
        Task<SeriesViewDto> GetSeriesById(int id);
        Task<PagedData<SeriesViewDto>> GetSeries(SeriesQueryObject query);
        Task UpdateSeriesById(int seriesId, UpdateSeriesDto dto);
        Task DeleteSeriesById(int seriesId);
        Task<SeriesCollectionViewDto?> GetCollectionsBySeriesId(int seriesId);
        Task<PagedData<SeriesCollectionViewDto>> GetSeriesCollections(SeriesQueryObject query);
    }
}