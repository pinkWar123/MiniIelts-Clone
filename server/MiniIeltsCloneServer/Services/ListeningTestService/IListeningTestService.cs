using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Wrappers;


namespace MiniIeltsCloneServer.Services.ListeningTestService
{
    public interface IListeningTestService
    {
        Task CreateListeningTest(CreateListeningTestDto dto);
        Task UpdateListeningTest(int id, UpdateListeningTestDto dto);
        Task<ListeningTestViewDto> GetListeningTestById(int id);
        Task<PagedData<ListeningDropDownDto>> GetListeningTests(ListeningTestQueryObject @object);
        Task<ListeningTestKeyDto> GetListeningTestKey(int listeningTestId);
        Task<int> SubmitTest(int testId, TestSubmitDto testSubmitDto);
        Task<ListeningResultDto> GetListeningTestResultById(int id);
    }
}