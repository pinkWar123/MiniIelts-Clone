using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Question
{
    public class QuestionWithExplanation
    {
        public required string Content { get; set; }
        public required string Answer { get; set; }
        public Explanation? Explanation { get; set; }
    }
}