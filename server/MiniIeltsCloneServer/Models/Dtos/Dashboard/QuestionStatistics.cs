using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;

namespace MiniIeltsCloneServer.Models.Dtos.Dashboard
{
    public class QuestionStatistics
    {
        public QuestionTypeEnum QuestionType { get; set; }
        public double Accuracy { get; set; } 
    }
}