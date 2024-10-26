using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.ListeningTestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.ListeningTestRepo
{
    public interface IListeningTestRepository : IGenericRepository<ListeningTest>
    {
        Task<PagedData<ListeningTest>> GetListeningTests(ListeningTestQueryObject @object);
    }
}