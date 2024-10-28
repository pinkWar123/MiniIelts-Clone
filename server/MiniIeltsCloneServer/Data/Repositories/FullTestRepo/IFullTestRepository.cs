using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.FullTestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.FullTestRepo
{
    public interface IFullTestRepository : IGenericRepository<FullTest>
    {
        Task<PagedData<FullTest>> GetFullTests(FullTestQueryObject @object);
        Task<FullTest?> GetFullTestWithExplanation(int testId);
    }
}