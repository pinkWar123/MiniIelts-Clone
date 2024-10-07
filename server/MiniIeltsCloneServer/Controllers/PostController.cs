using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Models.Dtos.Post;
using MiniIeltsCloneServer.Services.PostService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetPostById([FromRoute] int id)
        {
            var post = await _postService.GetPostById(id);
            return Results.Ok(new Response<PostViewDto>(post));
        }

        [HttpGet("random")]
        public async Task<IResult> GetRandomPosts()
        {
            var posts = await _postService.GetRandomTop5Posts();
            return Results.Ok(new Response<List<PostListingDto>>(posts));
        }

        [HttpPost]
        public async Task<IResult> CreatePost([FromBody] CreatePostDto dto)
        {
            await _postService.CreateNewPost(dto);
            return Results.Accepted();
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdatePostById([FromRoute] int id, [FromBody] UpdatePostDto dto)
        {
            await _postService.UpdatePostById(id, dto);
            return Results.Accepted();
        }

        [HttpDelete("{id}")]
        public async Task<IResult> DeletePostById([FromRoute] int id)
        {
            await _postService.DeletePostById(id);
            return Results.NoContent();
        }
    }
}