using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Dashboard
{
    public class TestHistory
    {
        public DateTime TestTakenDate { get; set; }
        public required string TestTitle { get; set; }
        public double Score { get; set; }
        public int? TestId { get; set; }
        public int Time { get; set; }
        public int ResultId { get; set; }
    }
}