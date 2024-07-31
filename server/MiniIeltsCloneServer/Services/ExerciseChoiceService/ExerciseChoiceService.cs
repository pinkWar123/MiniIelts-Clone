using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Data.Repositories.ExerciseChoiceRepo;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.ExerciseChoice;

namespace MiniIeltsCloneServer.Services.ExerciseChoiceService
{
    public class ExerciseChoiceService : GenericService, IExerciseChoiceService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ExerciseChoiceService(IMapper mapper, IUnitOfWork unitOfWork) : base(mapper)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task CreateExerciseChoiceAsync(CreateExerciseChoiceDto createExerciseChoiceDto)
        {
            var exerciseChoice = _mapper.Map<ExerciseChoice>(createExerciseChoiceDto);
            await _unitOfWork.ExerciseChoiceRepository.AddAsync(exerciseChoice);
        }

        public async Task<List<ExerciseChoiceViewDto>?> GetAllExerciseChoicesAsync(ExerciseChoiceQueryObject exerciseChoiceQueryObject)
        {
            var exerciseChoices = _unitOfWork.ExerciseChoiceRepository.GetValuesByQuery(exerciseChoiceQueryObject);
            if (exerciseChoices == null) return null;
            return await exerciseChoices.Select(x => _mapper.Map<ExerciseChoiceViewDto>(x)).ToListAsync();
        }
    }
}
