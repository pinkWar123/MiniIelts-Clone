using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;

namespace MiniIeltsCloneServer.Models.Listening
{
    public class ListeningExercise : Base
    {
        public int ListeningPartId { get; set; }
        public ListeningPart ListeningPart { get; set; }
        public int Order { get; set; }
        public QuestionTypeEnum ExerciseType { get; set; }
        public int QuestionCount { get; set; }
        public int StartQuestion { get; set; }
        public int EndQuestion { get; set; }
        public int ChoiceCount { get; set; }
        public string? Description { get; set; }
        public string? Content { get; set; }
        public List<Question> Questions { get; set; } = new List<Question>();
        public List<ExerciseChoice> ChooseManyChoices { get; set; } = new List<ExerciseChoice>(); // This field is only used for choose many exercise
    }
}