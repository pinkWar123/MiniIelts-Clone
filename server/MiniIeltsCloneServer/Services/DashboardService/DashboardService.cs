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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;

        public DashboardService(IUnitOfWork unitOfWork, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
        }

        public async Task<PagedData<TestHistory>> GetFullTestHistory(DashboardQueryObject @object)
        {
            var user = await _userService.GetCurrentUser();
            if(user == null)
                throw new UnauthorizedAccessException();
            var history = await _unitOfWork.FullTestResultRepository.GetFullTestHistory(user.Id, @object);
            return history;
        }

        public async Task<Performance> GetOverallEvaluation()
        {
            var user = await _userService.GetCurrentUser();
            if(user == null)
                throw new UnauthorizedAccessException();
            var performance = await _unitOfWork.ResultRepository.GetOverallResult(user.Id);
            return performance;
        }

        public async Task<Performance> GetOverallEvaluationByAdmin(string userId)
        {
            return await _unitOfWork.ResultRepository.GetOverallResult(userId);
        }

        public async Task<List<QuestionStatistics>> GetQuestionStatistics()
        {
            var user = await _userService.GetCurrentUser();
            if(user == null)
                throw new UnauthorizedAccessException();
            var statistics = await _unitOfWork.ResultRepository.GetQuestionStatistics(user.Id);
            return statistics;
        }

        public async Task<List<QuestionStatistics>> GetQuestionStatisticsByAdmin(string userId)
        {
            return await _unitOfWork.ResultRepository.GetQuestionStatistics(userId);
        }

        public async Task<PagedData<TestHistory>> GetTestHistory(DashboardQueryObject @object)
        {
            var user = await _userService.GetCurrentUser();
            if(user == null)
                throw new UnauthorizedAccessException();
            var history = await _unitOfWork.ResultRepository.GetTestHistory(user.Id, @object);
            return history;
        }

        public async Task<PagedData<TestHistory>> GetTestHistoryByAdmin(string userId, DashboardQueryObject @object)
        {
            return await _unitOfWork.ResultRepository.GetTestHistory(userId, @object);
        }

        public async Task<PagedData<TestHistory>> GetListeningTestHistory(DashboardQueryObject @object)
        {
            var user = await _userService.GetCurrentUser();
            if(user == null) throw new UnauthorizedAccessException();

            var result = await _unitOfWork.ListeningResultRepository.GetListeningTestHistory(user.Id, @object);
            return result;      
        }
    }
}