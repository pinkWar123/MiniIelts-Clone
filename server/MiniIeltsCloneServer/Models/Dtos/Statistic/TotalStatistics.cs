using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Statistic
{
    public class TotalStatistics
    {
        public int TotalUsers { get; set; }
        public int TotalTests { get; set; }
        public int TotalTestTakenTimes { get; set; }
    }
}