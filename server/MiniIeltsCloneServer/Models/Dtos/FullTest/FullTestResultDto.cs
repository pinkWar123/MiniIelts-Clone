using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Models.Dtos.FullTest
{
    public class TestResultDto
    {
        public int Part { get; set; }
        public int StartQuestion { get; set; }
        public int EndQuestion { get; set; }
        public List<QuestionResultDto> QuestionResults { get; set; } = new List<QuestionResultDto>();
    }
    public class TestKeyDto
    {
        public int Part { get; set; }
        public int StartQuestion { get; set; }
        public int EndQuestion { get; set; }
        public List<QuestionKeyDto> Keys { get; set; } = new List<QuestionKeyDto>();
    }
    public class FullTestResultDto
    {
        public int FullTestId { get; set; }
        public required string Title { get; set; }
        public double Marks { get; set; }
        public int Correct { get; set; }
        public int QuestionCount { get; set; }
        public List<TestResultDto> Results { get; set; } = new List<TestResultDto>();
        public int Time { get; set; }
    }
    public class FullTestKeyDto
    {
        public int FullTestId { get; set; }
        public required string Title { get; set; }
        public int QuestionCount { get; set; }
        public List<TestKeyDto> TestKeys { get; set; } = new List<TestKeyDto>();
    }
}