using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using AutoMapper;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Exceptions.Test;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;
using MiniIeltsCloneServer.Models.Dtos.Question;
using MiniIeltsCloneServer.Services.FullTestService;
using MiniIeltsCloneServer.Wrappers;

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

        public async Task<PagedData<ListeningDropDownDto>> GetListeningTests(ListeningTestQueryObject @object)
        {
            var listeningTests = await _unitOfWork.ListeningTestRepository.GetListeningTests(@object);
            var values = listeningTests.Value.Select(f => new ListeningDropDownDto
            {
                Title = f.Title,
                Id = f.Id
            }).ToList();

            return new PagedData<ListeningDropDownDto>
            {
                Value = values,
                TotalRecords = listeningTests.TotalRecords
            };
        }

        public async Task UpdateListeningTest(int id, UpdateListeningTestDto dto)
        {
            var test = await _unitOfWork.ListeningTestRepository.GetByIdAsync(id);
            if(test == null) throw new TestNotFoundException($"Can't find listening test with id {id}");

            test.Title = dto.Title;
            test.VideoId = dto.VideoId;
            test.ListeningParts = dto.ListeningParts.Select(lp => _mapper.Map<ListeningPart>(lp)).ToList();

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<ListeningTestKeyDto> GetListeningTestKey(int listeningTestId)
        {
            var listeningTest = await _unitOfWork.ListeningTestRepository.GetByIdAsync(listeningTestId);
            if(listeningTest == null) throw new TestNotFoundException($"Can't find test with id ${listeningTestId}");
            
            var part = 1;
            var offset = 0;
            var testKeys = listeningTest.ListeningParts.Select(t =>
            {
                var dto = new TestKeyDto
                {
                    Part = part,
                    StartQuestion = (part - 1) * 10 + 1,
                    EndQuestion = part * 10 - 1,
                    Keys = t.ListeningExercises.SelectMany(e => e.Questions).Select(q => new QuestionKeyDto
                    {
                        Order = q.Order + offset,
                        Answer = q.Answer
                    }).ToList(),
                };
                part++;
                return dto;
            }).ToList();

            return new ListeningTestKeyDto
            {
                ListeningTestId = listeningTestId,
                Title = listeningTest.Title,
                QuestionCount = 40,
                TestKeys = testKeys,
                VideoId = listeningTest.VideoId,
                Transcripts = listeningTest.ListeningParts.Select(lp => lp.Transcript).ToList()
            };
        }
    }
}