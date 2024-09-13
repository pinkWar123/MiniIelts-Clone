using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Data.Repositories.StatisticRepo;
using MiniIeltsCloneServer.Extensions;

namespace MiniIeltsCloneServer.Services.HangfireService
{
    public class HangfireService : IHangfireService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStatisticRepository _statisticRepo;
        private readonly IDistributedCache _cache;
        public HangfireService(IUnitOfWork unitOfWork, IStatisticRepository statisticRepo, IDistributedCache cache)
        {
            _unitOfWork = unitOfWork;
            _statisticRepo = statisticRepo;
            _cache = cache;
        }
        public async Task CacheQuestionAccuracies()
        {
            var accuracies = await _statisticRepo.GetQuestionAccuracies();
            var cacheKey = "questionAccuracies";
            await _cache.SetAsync(cacheKey, accuracies);
        }

        public async Task CacheQuestionDistribution()
        {
            var distribution = await _statisticRepo.GetQuestionDistribution();
            var cacheKey = "questionDistribution";
            await _cache.SetAsync(cacheKey, distribution);
        }

        public async Task CacheScoreDistribution()
        {
            var distribution = await _statisticRepo.GetScoreDistribution();
            var cacheKey = "scoreDistribution";
            await _cache.SetAsync(cacheKey, distribution);
        }
    }
}