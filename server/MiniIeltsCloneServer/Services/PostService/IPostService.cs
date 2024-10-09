using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Post;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.PostService
{
    public interface IPostService
    {
        Task<int> CreateNewPost(CreatePostDto dto);
        Task UpdatePostById(int id, UpdatePostDto dto);
        Task<bool> HasPostTitleExisted(string title);
        Task<PostViewDto> GetPostById(int id);
        Task<List<PostListingDto>?> GetRandomTop5Posts();
        Task DeletePostById(int id);
        Task<PagedData<PostListingDto>> GetPosts(PostQueryObject query);
        Task<RatingResult> VotePostById(int id, double vote);
    }
}