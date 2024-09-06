using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Models.Dtos.Result;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.DashboardService;

namespace MiniIeltsCloneServer.Data.Repositories.ResultRepo
{
    public interface IResultRepository: IGenericRepository<Result>
    {
        public Task<Performance> GetOverallResult(string userId);
        public Task<List<TestHistory>> GetTestHistory(string userId, DashboardQueryObject @object);
        public Task<List<QuestionStatistics>> GetQuestionStatistics(string userId);
        public Task<TestResultDto> GetResultById(int resultId);
    }
}