using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.PostService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.PostRepo
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        Task<List<Post>> GetRandomPosts(int postCount);
        Task<PagedData<Post>> GetPosts(PostQueryObject query);
        
    }
}