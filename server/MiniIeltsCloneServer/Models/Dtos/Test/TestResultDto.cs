using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Models.Dtos.Test
{
    public class TestResultDto
    {
        public int TestId { get; set; }

        public required string Title { get; set; }
        public double Marks { get; set; }
        public int Correct { get; set; }
        public int Incorrect { get; set; }
        public int Unanswered { get; set; }
        public int QuestionCount { get; set; }
        public List<QuestionResultDto> QuestionResults { get; set; } = new List<QuestionResultDto>();
    }
}