using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Exceptions.Post;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Post;
using MiniIeltsCloneServer.Services.UserService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.PostService
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public PostService(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userService = userService;
        }
        public async Task<int> CreateNewPost(CreatePostDto dto)
        {
            var hasTitleExisted = await HasPostTitleExisted(dto.Title);
            if(hasTitleExisted)
            {
                throw new BadHttpRequestException($"Post with title {dto.Title} already exists");
            }

            var currentUser = await _userService.GetCurrentUser();

            var post = new Post
            {
                Title = dto.Title,
                Image = dto.Image,
                Content = dto.Content,
                CreatedOn = DateTime.UtcNow,
                Tag = dto.Tag
            };

            if(currentUser != null)
            {
                post.CreatedBy = currentUser.UserName;
                post.AppUserId = currentUser.Id;
            }

            await _unitOfWork.PostRepository.AddAsync(post);
            await _unitOfWork.SaveChangesAsync();
            return post.Id;
        }

        public async Task DeletePostById(int id)
        {
            var postToDelete = await _unitOfWork.PostRepository.GetByIdAsync(id);
            if(postToDelete == null) throw new PostNotFoundException(id);
            _unitOfWork.PostRepository.Remove(postToDelete);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<PostViewDto> GetPostById(int id)
        {
            var post = await _unitOfWork.PostRepository.GetByIdAsync(id);
            if(post == null)
            {
                throw new PostNotFoundException(id);
            }

            var postViewDto = _mapper.Map<Post, PostViewDto>(post);
            postViewDto.RatingResult = new RatingResult
            {
                RatingCount = post.Ratings.Count,
                AverageRating = post.Ratings.Count > 0 ? post.Ratings.Average(r => r.Rating) : 0
            };

            return postViewDto;
        }

        public async Task<PagedData<PostListingDto>> GetPosts(PostQueryObject query)
        {
            var posts = await _unitOfWork.PostRepository.GetPosts(query);
            return new PagedData<PostListingDto>
            {
                TotalRecords = posts.TotalRecords,
                Value = posts.Value.Select(p => _mapper.Map<Post, PostListingDto>(p)).ToList()
            };
        }

        public async Task<List<PostListingDto>?> GetRandomTop5Posts()
        {
            // Get the total number of posts
            var posts = await _unitOfWork.PostRepository.GetRandomPosts(5);
            if(posts == null) return null;
            return posts.Select(p => _mapper.Map<Post, PostListingDto>(p)).ToList();
        }


        public async Task<bool> HasPostTitleExisted(string title)
        {
            var posts = await _unitOfWork.PostRepository.FindAllAsync(p => p.Title.ToLower().Trim() == title.ToLower().Trim());
            return posts.Any();
        }

        public async Task UpdatePostById(int id, UpdatePostDto dto)
        {
            var post = await _unitOfWork.PostRepository.GetByIdAsync(id);
            if(post == null) throw new PostNotFoundException(id);
            post.Title = dto.Title;
            post.Image = dto.Image;
            post.Content = dto.Content;
            post.Tag = dto.Tag;
            await _unitOfWork.SaveChangesAsync();
        }
    }
}