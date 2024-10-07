using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.PostRepo
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        public PostRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public async Task<List<Post>> GetRandomPosts(int postCount)
        {
            var postSet = _context.Posts;
            var totalPostsCount = await postSet.CountAsync();

            // Handle case where there are fewer than 5 posts
            if (totalPostsCount == 0)
            {
                return new List<Post>();
            }

            // Limit max number of posts if less than 5 exist
            var numberToFetch = Math.Min(postCount, totalPostsCount);

            // Randomly select 5 distinct Post Ids based on the total count
            var randomPosts = await _context.Posts
                .AsQueryable()
                .OrderBy(p => Guid.NewGuid())  // Use random ordering in SQL
                .Take(numberToFetch)
                .ToListAsync();

            // Fetch those posts using the selected random Ids


            // Map the selected posts to PostListingDto
            return randomPosts;
        }
    }
}