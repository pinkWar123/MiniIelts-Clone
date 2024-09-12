using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Statistic;

namespace MiniIeltsCloneServer.Services.StatisticService
{
    public interface IStatisticService
    {
        Task<TotalStatistics> GetTotalStatistics();
        Task<TopStatistics> GetTopStatistics();
        Task<Accuracy> GetQuestionAccuracies();
        Task<QuestionDistribution> GetQuestionDistribution();
        Task<ScoreDistribution> GetScoreDistribution();
    }
}