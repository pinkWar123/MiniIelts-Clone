using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Models.Listening;

namespace MiniIeltsCloneServer.Models
{
    public class Question : Base
    {
        public int? ListeningExerciseId { get; set; }
        public ListeningExercise? ListeningExercise { get; set; }
        public int? ExerciseId { get; set; }
        public Excercise? Excercise { get; set; }
        public QuestionTypeEnum QuestionType { get; set; }
        public string? Content { get; set; }
        public string? Answer { get; set; }
        public int Order { get; set; }
        public List<QuestionChoice> Choices { get; set; } = new List<QuestionChoice>();
        public Explanation? Explanation { get; set; }
    }
}
