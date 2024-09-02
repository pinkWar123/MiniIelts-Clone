using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Result;

namespace MiniIeltsCloneServer.Mapping
{
    public class ResultProfile : Profile
    {
        public ResultProfile()
        {
            CreateMap<CreateResultDto, Result>();
            CreateMap<Result, ResultViewDto>();
        }
    }
}