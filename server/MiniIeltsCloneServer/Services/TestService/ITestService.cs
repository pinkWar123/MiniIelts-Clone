
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.TestService
{
    public interface ITestService
    {
        Task CreateTestAsync(CreateTestDto createTestDto);
        Task<PagedData<TestViewDto>?> GetAllTestsAsync(TestQueryObject queryObject);
        Task<TestViewDto?> GetTestById(int id);
        Task<TestResultDto?> GetTestResult(int testId, TestSubmitDto testSubmitDto);
        Task<TestResultDto?> SubmitTest(int testId, TestSubmitDto testSubmitDto);        
        double GetTestMark(int correct, int questionCount);
    }
}
