using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Dashboard
{
    public class Performance
    {
        public double AverageScore { get; set; }
        public int TestCount { get; set; }
        public int AverageTime { get; set; }
        public double Accuracy { get; set; }
    }
}