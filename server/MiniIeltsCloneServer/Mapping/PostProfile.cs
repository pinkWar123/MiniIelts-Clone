using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Post;

namespace MiniIeltsCloneServer.Mapping
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            CreateMap<CreatePostDto, Post>();
            CreateMap<Post, PostViewDto>();
        }
    }
}