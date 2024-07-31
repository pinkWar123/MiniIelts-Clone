using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Exercise;

namespace MiniIeltsCloneServer.Services.ExerciseService
{
    public class ExerciseService : IExerciseService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ExerciseService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task AddExerciseAsync(CreateExerciseDto createExerciseDto, int testId)
        {
            var test = await _unitOfWork.TestRepository.GetByIdAsync(testId);
            if (test == null) return;
            var exercise = _mapper.Map<Excercise>(createExerciseDto);
            exercise.TestId = testId;
            await _unitOfWork.ExerciseRepository.AddAsync(exercise);
        }

        public async Task<List<ExerciseViewDto>?> GetAllExercisesAsync(ExerciseQueryObject queryObject)
        {
            var exercises = _unitOfWork.ExerciseRepository.GetValuesByQuery(queryObject);
            if (exercises == null) return null;
            return await exercises.Select(x => _mapper.Map<ExerciseViewDto>(x))
                .Include(x => x.ChooseManyChoices)
                .ToListAsync();
        }
    }
}
