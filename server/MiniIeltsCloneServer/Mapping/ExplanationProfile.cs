using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Mapping
{
    public class ExplanationProfile : Profile
    {
        public ExplanationProfile()
        {
            CreateMap<Explanation, ExplanationViewDto>();
        }
    }
}