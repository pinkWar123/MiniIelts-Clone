using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.PostService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.PostRepo
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        public PostRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public async Task<PagedData<Post>> GetPosts(PostQueryObject query)
        {
            var postQuery = _context.Posts.AsQueryable();
            var title = query.Title;

            if(!String.IsNullOrEmpty(title))
            {
                postQuery = postQuery.Where(p => p.Title.ToLower().Trim().Contains(title.ToLower().Trim()));
            }

            var tag = query.Tag;
            if(tag != null) postQuery = postQuery.Where(p => p.Tag == tag);

            var sortBy = query.SortBy?.ToLower();
            var isDescending = query.IsDescending;

            var sortingOptions = new Dictionary<string, Expression<Func<Post, object>>>
            {
                { "title", p => p.Title },
                { "createdon", p => p.CreatedOn },
                { "viewcount", p => p.ViewCount }
            };

            // Apply sorting if sortBy is provided and exists in the dictionary
            if (!string.IsNullOrEmpty(sortBy) && sortingOptions.ContainsKey(sortBy))
            {
                var sortExpression = sortingOptions[sortBy];

                postQuery = isDescending 
                    ? postQuery.OrderByDescending(sortExpression) 
                    : postQuery.OrderBy(sortExpression);
            }

            var count = await postQuery.CountAsync();
            var pageNumber = query.PageNumber;
            var pageSize = query.PageSize;
            var posts = await postQuery.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedData<Post>
            {
                TotalRecords = count,
                Value = posts
            };
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