using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Data.Repositories.ResultRepo;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Services.DashboardService;
using MiniIeltsCloneServer.Services.UserService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.DashboardService
{
    public class DashboardService : IDashboardService
    {
        private readonly IResultRepository _resultRepository;
        private readonly IUserService _userService;

        public DashboardService(IResultRepository resultRepository, IUserService userService)
        {
            _resultRepository = resultRepository;
            _userService = userService;
        }

        public async Task<Performance> GetOverallEvaluation()
        {
            var user = await _userService.GetCurrentUser();
            if(user == null)
                throw new UnauthorizedAccessException();
            var performance = await _resultRepository.GetOverallResult(user.Id);
            return performance;
        }

        public async Task<List<QuestionStatistics>> GetQuestionStatistics()
        {
            var user = await _userService.GetCurrentUser();
            if(user == null)
                throw new UnauthorizedAccessException();
            var statistics = await _resultRepository.GetQuestionStatistics(user.Id);
            return statistics;
        }

        public async Task<PagedData<TestHistory>> GetTestHistory(DashboardQueryObject @object)
        {
            var user = await _userService.GetCurrentUser();
            if(user == null)
                throw new UnauthorizedAccessException();
            var history = await _resultRepository.GetTestHistory(user.Id, @object);
            return history;
        }
    }
}