using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Answer;

namespace MiniIeltsCloneServer.Mapping
{
    public class AnswerProfile : Profile
    {
        public AnswerProfile()
        {
            CreateMap<CreateAnswerDto, Answer>();
        }
    }
}