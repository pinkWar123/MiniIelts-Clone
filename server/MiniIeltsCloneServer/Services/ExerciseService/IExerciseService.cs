using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Exercise;

namespace MiniIeltsCloneServer.Services.ExerciseService
{
    public interface IExerciseService
    {
        Task AddExerciseAsync(CreateExerciseDto createExerciseDto, int testId);
        Task<List<ExerciseViewDto>?> GetAllExercisesAsync(ExerciseQueryObject queryObject);
    }
}
