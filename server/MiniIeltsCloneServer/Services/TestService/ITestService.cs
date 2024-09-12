
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.TestService
{
    public interface ITestService
    {
        Task CreateTestAsync(CreateTestDto createTestDto);
        Task<PagedData<TestViewDto>?> GetAllTestsAsync(TestQueryObject queryObject);
        Task<PagedData<TestSearchViewDto>> GetAllTestSearch(TestQueryObject queryObject);
        Task<TestViewDto?> GetTestById(int id);
        Task<TestResultDto?> GetTestResult(int testId, TestSubmitDto testSubmitDto);
        Task<TestSubmitResultDto?> SubmitTest(int testId, TestSubmitDto testSubmitDto);        
        double GetTestMark(int correct, int questionCount);
        Task IncrementTestViewCount(int testId);
    }
}
