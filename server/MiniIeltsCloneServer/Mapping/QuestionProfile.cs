using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Mapping
{
    public class QuestionProfile : Profile
    {
        public QuestionProfile()
        {
            CreateMap<Question, CreateQuestionDto>().ReverseMap();
            CreateMap<Question, QuestionViewDto>()
            .ForMember(dest => dest.Choices, opt => opt.MapFrom(src => src.Choices))
            .ReverseMap();
        }
    }
}
