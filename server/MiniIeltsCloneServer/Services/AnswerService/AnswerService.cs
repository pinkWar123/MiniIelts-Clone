using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Answer;

namespace MiniIeltsCloneServer.Services.AnswerService
{
    public class AnswerService : IAnswerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AnswerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateNewAnswer(CreateAnswerDto createAnswerDto)
        {
            var answer = _mapper.Map<Answer>(createAnswerDto);
            await _unitOfWork.AnswerRepository.AddAsync(answer);
        }
    }
}