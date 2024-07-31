using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.QuestionChoice;

namespace MiniIeltsCloneServer.Mapping
{
    public class QuestionChoiceProfile : Profile
    {
        public QuestionChoiceProfile()
        {
            CreateMap<QuestionChoice, CreateQuestionChoiceDto>().ReverseMap();
            CreateMap<QuestionChoice, QuestionChoiceViewDto>().ReverseMap();
        }
    }
}
