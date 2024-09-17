using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;

namespace MiniIeltsCloneServer.Mapping
{
    public class FullTestProfile : Profile
    {
        public FullTestProfile()
        {
            CreateMap<FullTest, FullTestViewDto>();   
        }
    }
}