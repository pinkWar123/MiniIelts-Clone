using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class FullTestResult : Base
    {
        public int FullTestId { get; set; }
        public FullTest FullTest { get; set; }
        public required string Title { get; set; }
        public double Marks { get; set; }
        public int Correct { get; set; }
        public int QuestionCount { get; set; }
        public List<Result> Results { get; set; } = new List<Result>();
        public int Time { get; set; }

    }
}