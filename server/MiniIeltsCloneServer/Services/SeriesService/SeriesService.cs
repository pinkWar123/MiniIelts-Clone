using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Exceptions.Series;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Series;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.SeriesService
{
    public class SeriesService : ISeriesService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public SeriesService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task CreateNewSeries(CreateSeriesDto dto)
        {
            using (var transaction = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var series = new Series
                    {
                        Title = dto.Title,
                        Image = dto.Image,
                        TestCount = dto.FullTestIds.Count
                    };

                    await _unitOfWork.SeriesRepository.AddAsync(series);
                    await _unitOfWork.SaveChangesAsync();

                    var fullTests = await _unitOfWork.FullTestRepository.FindAllAsync(f => dto.FullTestIds.Contains(f.Id));
                    if(fullTests == null || !fullTests.Any() || fullTests.Count != dto.FullTestIds.Count)
                    {
                        throw new Exception("Can not find all full tests");
                    }
                    foreach(var fullTest in fullTests)
                    {
                        fullTest.SeriesId = series.Id;
                    }

                    await _unitOfWork.SaveChangesAsync();
                    await _unitOfWork.CommitAsync();
                }
                catch (System.Exception)
                {
                    await _unitOfWork.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<SeriesViewDto> GetSeriesById(int id)
        {
            var series = await _unitOfWork.SeriesRepository.GetByIdAsync(id);
            if(series == null) throw new SeriesNotFoundException(id);
            return _mapper.Map<Series, SeriesViewDto>(series);
        }
        public async Task<PagedData<SeriesViewDto>> GetSeries(SeriesQueryObject query)
        {
            var series = await _unitOfWork.SeriesRepository.GetAllSeries(query);
            var a = series.Value[0];
            if(a.Tests != null) Console.WriteLine($"{a.Tests[0].Title}----------------------------------------------------------------");
            return new PagedData<SeriesViewDto>
            {
                TotalRecords = series.TotalRecords,
                Value = series.Value.Select(s => _mapper.Map<Series, SeriesViewDto>(s)).ToList()
            };
        }
    }
}