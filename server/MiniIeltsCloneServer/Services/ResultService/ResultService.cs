using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.HttpResults;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Data.Repositories.ResultRepo;
using MiniIeltsCloneServer.Exceptions;
using MiniIeltsCloneServer.Exceptions.Result;
using MiniIeltsCloneServer.Exceptions.Test;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Question;
using MiniIeltsCloneServer.Models.Dtos.Result;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Services.UserService;

namespace MiniIeltsCloneServer.Services.ResultService
{
    public class ResultService : IResultService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IResultRepository _resultRepo;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public ResultService(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService, IResultRepository resultRepo)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userService = userService;
            _resultRepo = resultRepo;
        }

        public async Task<ResultViewDto> CreateNewResult(CreateResultDto createResultDto)
        {
            var result = _mapper.Map<Result>(createResultDto);
            await _unitOfWork.ResultRepository.AddAsync(result);
            return _mapper.Map<ResultViewDto>(result);
            throw new NotImplementedException();
        }

        public async Task<TestResultDto> GetTestResultById(int resultId)
        {
            var currentUser = await _userService.GetCurrentUser();
            if(currentUser == null)
                throw new UnauthorizedAccessException();
            
            var result = await _unitOfWork.ResultRepository.GetByIdAsync(resultId);
            
            if(result == null) 
                throw new ResultNotFoundException(resultId);

            if(result.AppUserId != currentUser.Id)
                throw new ForbiddenException();
            
            var testResultDto = await _resultRepo.GetResultById(resultId);

            return testResultDto;
        }
    }
}