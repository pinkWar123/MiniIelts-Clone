using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Models.Dtos.QuestionChoice;

namespace MiniIeltsCloneServer.Models.Dtos.Question
{
    public class ExplanationViewDto
    {
        public int QuestionId { get; set; }
        public required string Content { get; set; }
    }
    public class QuestionViewDto
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public QuestionTypeEnum QuestionType { get; set; }
        public string? Content { get; set; }
        public string? Answer { get; set; }
        public int Order { get; set; }
        public ExplanationViewDto? Explanation { get; set; }
        public List<QuestionChoiceViewDto> Choices { get; set; } = new List<QuestionChoiceViewDto>();
    }
}
