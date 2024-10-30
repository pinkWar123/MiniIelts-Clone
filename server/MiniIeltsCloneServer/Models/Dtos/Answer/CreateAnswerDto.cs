using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;

namespace MiniIeltsCloneServer.Models.Dtos.Answer
{
    public class CreateAnswerDto
    {
        public bool IsCorrect { get; set; }
        public string? Value { get; set; }
        public int? ResultId { get; set; }
        public int? ListeningResultId { get; set; }
        public QuestionTypeEnum QuestionType { get; set; }
        public DateTime CreatedOn { get; set; }
        public required string AppUserId { get; set; }
        public required string CreatedBy { get; set; }
    }
}