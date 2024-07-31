using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Services.QuestionService
{
    public class QuestionService : IQuestionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public QuestionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task CreateNewQuestionAsync(CreateQuestionDto createQuestionDto, int exerciseId)
        {
            var exercise = await _unitOfWork.ExerciseRepository.GetByIdAsync(exerciseId);
            if (exercise == null) return;
            var question = _mapper.Map<Question>(createQuestionDto);
            question.ExerciseId = exerciseId;
            await _unitOfWork.QuestionRepository.AddAsync(question);
        }

        public async Task<List<QuestionViewDto>?> GetAllQuestions(QuestionQueryObject queryObject)
        {
            var questions = _unitOfWork.QuestionRepository.GetValuesByQuery(queryObject);
            if (questions == null) return null;
            return await questions.Select(x => _mapper.Map<QuestionViewDto>(x))
                .Include(x => x.Choices)
                .ToListAsync();
        }
    }
}
