using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Data.Repositories.StatisticRepo;
using MiniIeltsCloneServer.Models.Dtos.Statistic;

namespace MiniIeltsCloneServer.Services.StatisticService
{
    public class StatisticService : IStatisticService
    {
        private readonly IStatisticRepository _statisticRepo;
        public StatisticService(IStatisticRepository statisticRepo)
        {
            _statisticRepo = statisticRepo;
        }

        public async Task<Accuracy> GetQuestionAccuracies()
        {
            return await _statisticRepo.GetQuestionAccuracies();
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