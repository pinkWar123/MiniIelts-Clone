using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.DashboardService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.FullTestResultRepo
{
    public interface IFullTestResultRepository : IGenericRepository<FullTestResult>
    {
        Task<PagedData<TestHistory>> GetFullTestHistory(string userId, DashboardQueryObject @object);
    }
}