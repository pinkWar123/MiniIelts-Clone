using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Services
{
    public class GenericService
    {
        protected readonly IMapper _mapper;
        public GenericService(IMapper mapper)
        {
            _mapper = mapper;
        }
    }
}
