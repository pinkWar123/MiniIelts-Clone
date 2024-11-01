using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Models.Listening;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.DashboardService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.ListeningResultRepo
{
    public interface IListeningResultRepository : IGenericRepository<ListeningResult>
    {
        Task<PagedData<TestHistory>> GetListeningTestHistory(string userId, DashboardQueryObject @object);
        Task<List<QuestionStatistics>> GetQuestionStatistics(string userId);
    }
}