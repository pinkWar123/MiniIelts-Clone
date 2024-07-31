
using MiniIeltsCloneServer.Models.Dtos.Test;

namespace MiniIeltsCloneServer.Services.TestService
{
    public interface ITestService
    {
        Task CreateTestAsync(CreateTestDto createTestDto);
        Task<List<TestViewDto>?> GetAllTestsAsync(TestQueryObject queryObject);
        Task<TestViewDto?> GetTestById(int id);
        Task<TestResultDto?> GetTestResult(int testId, TestSubmitDto testSubmitDto);
        double GetTestMark(int correct, int questionCount);
    }
}
