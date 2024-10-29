using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;
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
    }
}