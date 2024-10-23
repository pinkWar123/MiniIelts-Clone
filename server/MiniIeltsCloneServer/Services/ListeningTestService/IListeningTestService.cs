using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;


namespace MiniIeltsCloneServer.Services.ListeningTestService
{
    public interface IListeningTestService
    {
        Task CreateListeningTest(CreateListeningTestDto dto);
        Task<ListeningTestViewDto> GetListeningTestById(int id);
    }
}