using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Models.Dtos.FullTest
{
    public class FullTestResultDto
    {
        public int FullTestId { get; set; }
        public required string Title { get; set; }
        public double Marks { get; set; }
        public int Correct { get; set; }
        public int QuestionCount { get; set; }
        public List<QuestionResultDto> QuestionResults { get; set; } = new List<QuestionResultDto>();
        public int Time { get; set; }
    }
}