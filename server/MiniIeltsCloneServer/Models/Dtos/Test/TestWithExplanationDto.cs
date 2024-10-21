using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Models.Dtos.Test
{
    public class TestWithExplanationDto
    {
        public required string TestTitle { get; set; }
        public required int TestId { get; set; }
        public List<QuestionWithExplanation> Questions { get; set; } = new List<QuestionWithExplanation>();
    }
}