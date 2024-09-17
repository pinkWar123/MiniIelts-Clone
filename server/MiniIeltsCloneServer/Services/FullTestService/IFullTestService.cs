using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.FullTest;

namespace MiniIeltsCloneServer.Services.FullTestService
{
    public interface IFullTestService
    {
        Task CreateFullTest(CreateFullTestDto dto);
        Task<FullTestViewDto> GetFullTestById(int id);
        
    }
}