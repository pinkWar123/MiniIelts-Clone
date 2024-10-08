using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models.Dtos.Post;
using MiniIeltsCloneServer.Services.PostService;
using MiniIeltsCloneServer.Services.UriService;
using MiniIeltsCloneServer.Validators;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IUriService _uriService;
        public PostController(IPostService postService, IUriService uriService)
        {
            _postService = postService;
            _uriService = uriService;
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

        [HttpGet]
        public async Task<IResult> GetPosts([FromQuery] PostQueryObject query)
        {
            var posts = await _postService.GetPosts(query);
            var pagedResponse = PaginationHelper.CreatePagedResponse(posts.Value, posts.TotalRecords, new Wrappers.Filter.PaginationFilter(query.PageNumber, query.PageSize), _uriService, Request.Path.Value);
            return Results.Ok(pagedResponse);
        }

        [HttpPost]
        public async Task<IResult> CreatePost([FromBody] CreatePostDto dto)
        {
            var validator = new CreatePostValidator();
            var result = await validator.ValidateAsync(dto);
            if(!result.IsValid)
            {
                return Results.ValidationProblem(result.ToDictionary());

            }
            var newPostId = await _postService.CreateNewPost(dto);
            return Results.Created($"/post/{newPostId}", new Response<int>(newPostId));
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdatePostById([FromRoute] int id, [FromBody] UpdatePostDto dto)
        {
            var validator = new UpdatePostValidator();
            var result = await validator.ValidateAsync(dto);
            if(!result.IsValid)
            {
                return Results.ValidationProblem(result.ToDictionary());

            }
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