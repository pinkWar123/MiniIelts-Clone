using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.ExerciseChoice;

namespace MiniIeltsCloneServer.Mapping
{
    public class ExerciseChoiceProfile : Profile
    {
        public ExerciseChoiceProfile()
        {
            CreateMap<ExerciseChoice, CreateExerciseChoiceDto>().ReverseMap();
            CreateMap<ExerciseChoice, ExerciseChoiceViewDto>().ReverseMap();
        }
    }
}
