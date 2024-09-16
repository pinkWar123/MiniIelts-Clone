using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using MiniIeltsCloneServer.Data.Repositories.StatisticRepo;
using MiniIeltsCloneServer.Extensions;
using MiniIeltsCloneServer.Models.Dtos.Statistic;

namespace MiniIeltsCloneServer.Services.StatisticService
{
    public class StatisticService : IStatisticService
    {
        private readonly IStatisticRepository _statisticRepo;
        private readonly IDistributedCache _cache;
        public StatisticService(IStatisticRepository statisticRepo, IDistributedCache cache)
        {
            _statisticRepo = statisticRepo;
            _cache = cache;
        }

        public async Task<Accuracy> GetQuestionAccuracies()
        {
            var cacheKey = "questionAccuracies";

            var questionAccuracies = await _cache.GetOrSetAsync(cacheKey, 
            async () => {
                return await _statisticRepo.GetQuestionAccuracies();
            })!;
            return questionAccuracies!;
            // return await _statisticRepo.GetQuestionAccuracies();
        }
        public async Task<QuestionDistribution> GetQuestionDistribution()
        {
            return await _statisticRepo.GetQuestionDistribution();
        }

        public async Task<ScoreDistribution> GetScoreDistribution()
        {
            return await _statisticRepo.GetScoreDistribution();
        }

        public async Task<TopStatistics> GetTopStatistics()
        {
            return await _statisticRepo.GetTopStatistics();
        }

        public async Task<TotalStatistics> GetTotalStatistics()
        {
            return await _statisticRepo.GetTotalStatistics();
        }
    }
}