using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Result;
using MiniIeltsCloneServer.Models.Dtos.Test;

namespace MiniIeltsCloneServer.Services.ResultService
{
    public interface IResultService
    {
        Task<ResultViewDto> CreateNewResult(CreateResultDto createResultDto);
        Task<TestResultDto> GetTestResultById(int resultId);
    }
}