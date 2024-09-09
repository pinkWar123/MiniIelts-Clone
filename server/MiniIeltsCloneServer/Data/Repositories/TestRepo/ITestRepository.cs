using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.TestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.TestRepo
{
    public interface ITestRepository : IGenericRepository<Test>
    {
        Task<PagedData<Test>> GetTestSearchViews(TestQueryObject @object);
    }
}
