using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Models.Listening;

namespace MiniIeltsCloneServer.Models
{
    public class Answer : Base
    {
        public bool IsCorrect { get; set; }
        public string? Value { get; set; }
        public int? ResultId { get; set; }
        public Result? Result { get; set; }
        public int? ListeningResultId { get; set; }
        public ListeningResult? ListeningResult { get; set; }
        public QuestionTypeEnum QuestionType { get; set; }
    }
}
