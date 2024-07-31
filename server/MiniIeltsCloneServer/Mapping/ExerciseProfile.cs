using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Exercise;

namespace MiniIeltsCloneServer.Mapping
{
    public class ExerciseProfile : Profile
    {
        public ExerciseProfile()
        {
            CreateMap<Models.Excercise, CreateExerciseDto>().ReverseMap();
            CreateMap<Excercise, ExerciseViewDto>()
            .ForMember(dest => dest.ChooseManyChoices, opt => opt.MapFrom(src => src.ChooseManyChoices))
            .ForMember(dest => dest.Questions, opt => opt.MapFrom(src => src.Questions))
            .ReverseMap();
        }
    }
}
