using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using MiniIeltsCloneServer.Models.Dtos.Exercise;

namespace MiniIeltsCloneServer.Models.Dtos.Test
{
    public class CreateTestDto
    {
        public string? Title { get; set; }
        public string? Essay { get; set; }
        public string? Picture { get; set; }
        public int QuestionCount { get; set; }
        public CategoryEnum Category { get; set; }
        public List<CreateExerciseDto> Excercises { get; set; } = new List<CreateExerciseDto>();

    }
}
