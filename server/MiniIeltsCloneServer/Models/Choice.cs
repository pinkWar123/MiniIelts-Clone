using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Listening;

namespace MiniIeltsCloneServer.Models
{
    public class Choice : Base
    {
        public string? Content { get; set; }
        public string? Value { get; set; }
        public int Order { get; set; }

    }

    public class ExerciseChoice : Choice
    {
        public int? ExerciseId { get; set; }
        public Excercise? Excercise { get; set; }
        public int? ListeningExerciseId { get; set; }
        public ListeningExercise? ListeningExercise { get; set; }
    }

    public class QuestionChoice : Choice
    {
        public int QuestionId { get; set; }
        public Question? Question { get; set; }
    }
}
