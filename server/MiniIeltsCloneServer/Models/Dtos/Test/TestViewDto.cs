using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using MiniIeltsCloneServer.Models.Dtos.Exercise;

namespace MiniIeltsCloneServer.Models.Dtos.Test
{
    public class TestViewDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Essay { get; set; }
        public string? Picture { get; set; }
        public int ViewCount { get; set; } = 0;
        public int QuestionCount { get; set; } = 0;
        public CategoryEnum Category { get; set; }
        public List<ExerciseViewDto> Excercises { get; set; } = new List<ExerciseViewDto>();
    }
}
