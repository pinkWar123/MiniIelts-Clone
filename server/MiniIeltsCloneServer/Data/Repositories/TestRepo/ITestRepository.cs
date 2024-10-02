using System.Linq.Expressions;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.TestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.TestRepo
{
    public interface ITestRepository : IGenericRepository<Test>
    {
        Task<PagedData<Test>> GetTestSearchViews(TestQueryObject @object);
        Task<int> CountAsync(Expression<Func<Test, bool>>? predicate);
        Task<List<TestDropdownViewDto>> GetTestDropdownViewDtos(string testName);
    }
}
