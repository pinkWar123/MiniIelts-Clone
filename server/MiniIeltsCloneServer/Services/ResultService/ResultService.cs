using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Result;

namespace MiniIeltsCloneServer.Services.ResultService
{
    public class ResultService : IResultService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ResultService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResultViewDto> CreateNewResult(CreateResultDto createResultDto)
        {
            var result = _mapper.Map<Result>(createResultDto);
            await _unitOfWork.ResultRepository.AddAsync(result);
            return _mapper.Map<ResultViewDto>(result);
            throw new NotImplementedException();
        }
    }
}