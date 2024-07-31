using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Authentication;

namespace MiniIeltsCloneServer.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // CreateMap<AppUser, LoginDto>().ReverseMap();
            CreateMap<AppUser, RegisterDto>().ReverseMap();
        }
    }
}
