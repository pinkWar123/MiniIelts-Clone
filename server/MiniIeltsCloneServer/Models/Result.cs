using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class Result : Base
    {
        public int TestId { get; set; }
        public Test? Test { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
        public int? FullTestResultId { get; set; }
        public FullTestResult FullTestResult { get; set; }
        public double Score { get; set; }
        public int Time { get; set; }

    }
}
