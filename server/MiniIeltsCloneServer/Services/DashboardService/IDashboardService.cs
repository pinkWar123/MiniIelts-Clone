using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.DashboardService
{
    public interface IDashboardService
    {
        Task<Performance> GetOverallEvaluation();
        Task<Performance> GetOverallEvaluationByAdmin(string userId);
        Task<PagedData<TestHistory>> GetTestHistory(DashboardQueryObject @object);
        Task<PagedData<TestHistory>> GetFullTestHistory(DashboardQueryObject @object);
        Task<PagedData<TestHistory>> GetTestHistoryByAdmin(string userId, DashboardQueryObject @object);
        Task<List<QuestionStatistics>> GetQuestionStatistics();
        Task<List<QuestionStatistics>> GetQuestionStatisticsByAdmin(string userId);
        Task<PagedData<TestHistory>> GetListeningTestHistory(DashboardQueryObject @object);
    }
}