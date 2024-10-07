using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.PostRepo
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        Task<List<Post>> GetRandomPosts(int postCount);
        
    }
}