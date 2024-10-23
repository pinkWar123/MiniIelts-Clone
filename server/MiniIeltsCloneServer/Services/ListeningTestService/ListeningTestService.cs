using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;

namespace MiniIeltsCloneServer.Services.ListeningTestService
{
    public class ListeningTestService : IListeningTestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ListeningTestService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;           
            _mapper = mapper;
        }
        public async Task CreateListeningTest(CreateListeningTestDto dto)
        {
            var listeningTest = _mapper.Map<CreateListeningTestDto, ListeningTest>(dto);
            await _unitOfWork.ListeningTestRepository.AddAsync(listeningTest);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<ListeningTestViewDto> GetListeningTestById(int id)
        {
            var test = await _unitOfWork.ListeningTestRepository.GetByIdAsync(id);
            return _mapper.Map<ListeningTestViewDto>(test);
        }
    }
}