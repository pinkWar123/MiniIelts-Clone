using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;

namespace MiniIeltsCloneServer.Models.Dtos.Statistic
{
    public class QuestionAccuracy
    {
        public QuestionTypeEnum QuestionType { get; set; }
        public double Accuracy { get; set; }
    }
    public class Accuracy
    {
        public List<QuestionAccuracy> QuestionAccuracies { get; set; } = new List<QuestionAccuracy>();
    }
}