using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Models.Dtos.ExerciseChoice;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Models.Dtos.Exercise
{
    public class ExerciseViewDto
    {
        public int TestId { get; set; }
        public int Order { get; set; }
        public QuestionTypeEnum ExerciseType { get; set; }
        public int QuestionCount { get; set; }
        public int StartQuestion { get; set; }
        public int EndQuestion { get; set; }
        public string? Description { get; set; }
        public string? Content { get; set; }
        public int ChoiceCount { get; set; }
        public List<QuestionViewDto> Questions { get; set; } = new List<QuestionViewDto>();
        public List<ExerciseChoiceViewDto> ChooseManyChoices { get; set; } = new List<ExerciseChoiceViewDto>();
    }
}
