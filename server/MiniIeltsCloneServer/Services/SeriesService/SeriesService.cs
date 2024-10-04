using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Exceptions.Series;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Series;
using MiniIeltsCloneServer.Services.UserService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.SeriesService
{
    public class SeriesService : ISeriesService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public SeriesService(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userService = userService;
        }
        public async Task CreateNewSeries(CreateSeriesDto dto)
        {
            var currentUser = await _userService.GetCurrentUser();
            using (var transaction = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var series = new Series
                    {
                        Title = dto.Title,
                        Image = dto.Image,
                        TestCount = dto.FullTestIds.Count,
                        CreatedOn = DateTime.UtcNow
                    };

                    if(currentUser != null)
                    {
                        series.AppUserId = currentUser.Id;
                        series.CreatedBy = currentUser.UserName;
                    }

                    await _unitOfWork.SeriesRepository.AddAsync(series);
                    await _unitOfWork.SaveChangesAsync();

                    var seriesFullTests = new List<SeriesFullTest>();

                    foreach(var id in dto.FullTestIds)
                    {
                        var newEntity = new SeriesFullTest
                        {
                            SeriesId = series.Id,
                            FullTestId = id,
                        };
                        seriesFullTests.Add(newEntity);
                    }

                    await _unitOfWork.SeriesFullTestRepository.AddRangeAsync(seriesFullTests);
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
            return new SeriesViewDto
            {
                Id = series.Id,
                Title = series.Title,
                Image = series.Image,
                CreatedOn = series.CreatedOn,
                TestCount = series.TestCount,
                Tests = series.SeriesFullTests.Select(s => new FullTestNameDto
                {
                    Id = s.FullTest.Id,
                    Title = s.FullTest.Title
                }).ToList()
            };
        }
        public async Task<PagedData<SeriesViewDto>> GetSeries(SeriesQueryObject query)
        {
            var series = await _unitOfWork.SeriesRepository.GetAllSeries(query);
            var a = series.Value[0];
            
            return new PagedData<SeriesViewDto>
            {
                TotalRecords = series.TotalRecords,
                Value = series.Value.Select(s => new SeriesViewDto
                {
                    Id = s.Id,
                    Title = s.Title,
                    Image = s.Image,
                    CreatedOn = s.CreatedOn,
                    TestCount = s.TestCount,
                    Tests = s.SeriesFullTests.Select(s => new FullTestNameDto
                    {
                        Id = s.FullTest.Id,
                        Title = s.FullTest.Title
                    }).ToList()
                }).ToList()
            };
        }

        public async Task UpdateSeriesById(int seriesId, UpdateSeriesDto dto)
        {
            var series = await _unitOfWork.SeriesRepository.GetByIdAsync(seriesId);
            if(series == null) throw new SeriesNotFoundException(seriesId);

            series.Image = dto.Image;
            var title = dto.Title;
            series.Title = title;
            var curIds = series.SeriesFullTests.Select(sf => sf.FullTestId).ToList();
            var oldEntities = await _unitOfWork.SeriesFullTestRepository.FindAllAsync(e => curIds.Contains(e.FullTestId));
            _unitOfWork.SeriesFullTestRepository.RemoveRange(oldEntities);
            var order = 1;
            
            var newEntities = dto.FullTestIds.Select(id => new SeriesFullTest
            {
                SeriesId = series.Id,
                FullTestId = id,
                FullTestOrder = order++
            }).ToList();

            await _unitOfWork.SeriesFullTestRepository.AddRangeAsync(newEntities);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteSeriesById(int seriesId)
        {
            var series = await _unitOfWork.SeriesRepository.GetByIdAsync(seriesId);
            if(series == null) throw new SeriesNotFoundException(seriesId);
            _unitOfWork.SeriesRepository.Remove(series);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}