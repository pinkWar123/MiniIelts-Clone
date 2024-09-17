
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.TestService
{
    public interface ITestService
    {
        Task CreateTestAsync(CreateTestDto createTestDto);
        Task UpdateTestAsync(int testId, UpdateTestDto updateTestDto);
        Task<PagedData<TestViewDto>?> GetAllTestsAsync(TestQueryObject queryObject);
        Task<PagedData<TestSearchViewDto>> GetAllTestSearch(TestQueryObject queryObject);
        Task<TestViewDto?> GetTestById(int id);
        Task<List<TestDropdownViewDto>> GetTestDropdownViewDtos(string testName);
        Task<TestResultDto?> GetTestResult(int testId, TestSubmitDto testSubmitDto);
        Task<TestSubmitResultDto?> SubmitTest(int testId, TestSubmitDto testSubmitDto);
        Task DeleteTestById(int id);        
        double GetTestMark(int correct, int questionCount);
        Task IncrementTestViewCount(int testId);
    }
}
