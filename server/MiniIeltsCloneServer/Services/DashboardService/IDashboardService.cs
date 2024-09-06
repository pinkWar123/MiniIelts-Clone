using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;

namespace MiniIeltsCloneServer.Services.DashboardService
{
    public interface IDashboardService
    {
        Task<Performance> GetOverallEvaluation();
        Task<List<TestHistory>> GetTestHistory(DashboardQueryObject @object);
        Task<List<QuestionStatistics>> GetQuestionStatistics();
    }
}