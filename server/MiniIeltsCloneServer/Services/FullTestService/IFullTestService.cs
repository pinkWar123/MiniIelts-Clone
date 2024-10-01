using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.FullTestService
{
    public interface IFullTestService
    {
        Task CreateFullTest(CreateFullTestDto dto);
        Task<FullTestViewDto> GetFullTestById(int id);
        Task<PagedData<FullTestViewDto>> GetFullTests(FullTestQueryObject @object);
        Task<bool> HasNameExisted(string name);
        Task<int> SubmitFullTest(int fullTestId, SubmitFullTestDto dto);
        Task<FullTestKeyDto> GetFullTestKey(int fullTestId);
        Task IncrementViewCount(int fullTestId);
        double GetBandScore(int correct);
        Task<FullTestResultDto> GetFullTestResultById(int id);
        Task<FullTestResultDto> GetFullTestResult(int fullTestId, SubmitFullTestDto dto);
    }
}