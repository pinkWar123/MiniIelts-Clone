using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.ExerciseChoice;

namespace MiniIeltsCloneServer.Services.ExerciseChoiceService
{
    public interface IExerciseChoiceService
    {
        Task CreateExerciseChoiceAsync(CreateExerciseChoiceDto createExerciseChoiceDto);
        Task<List<ExerciseChoiceViewDto>?> GetAllExerciseChoicesAsync(ExerciseChoiceQueryObject exerciseChoiceQueryObject);
    }
}
