using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Test;

namespace MiniIeltsCloneServer.Mapping
{
    public class TestProfile : Profile
    {
        public TestProfile()
        {
            CreateMap<Test, CreateTestDto>().ReverseMap();
            CreateMap<Test, TestViewDto>()
            .ForMember(dest => dest.Excercises, opt => opt.MapFrom(src => src.Excercises))
            .ReverseMap();
        }
    }
}
