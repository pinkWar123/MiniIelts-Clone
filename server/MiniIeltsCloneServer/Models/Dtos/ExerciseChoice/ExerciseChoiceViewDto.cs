using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.ExerciseChoice
{
    public class ExerciseChoiceViewDto
    {
        public int ExerciseId { get; set; }
        public string? Content { get; set; }
        public string? Value { get; set; }
        public int Order { get; set; }
    }
}
