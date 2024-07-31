using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Data.Repositories.QuestionChoiceRepo;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.QuestionChoice;

namespace MiniIeltsCloneServer.Services.QuestionChoiceService
{
    public class QuestionChoiceService : GenericService, IQuestionChoiceService
    {
        private readonly IUnitOfWork _unitOfWork;
        public QuestionChoiceService(IMapper mapper, IUnitOfWork unitOfWork) : base(mapper)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CreateQuestionChoiceAsync(CreateQuestionChoiceDto createQuestionChoiceDto)
        {
            var createQuestionChoice = _mapper.Map<QuestionChoice>(createQuestionChoiceDto);
            await _unitOfWork.QuestionChoiceRepository.AddAsync(createQuestionChoice);
        }

        public async Task<List<QuestionChoiceViewDto>?> GetAllQuestionChoicesAsync(QuestionChoiceQueryObject questionChoiceQueryObject)
        {
            var questionChoices = _unitOfWork.QuestionChoiceRepository.GetValuesByQuery(questionChoiceQueryObject);
            if (questionChoices == null) return null;
            return await questionChoices.Select(x => _mapper.Map<QuestionChoiceViewDto>(x)).ToListAsync();
        }
    }
}
