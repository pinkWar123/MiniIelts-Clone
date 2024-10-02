using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class FullTest : Base
    {
        public List<Test> Tests { get; set; } = new List<Test>();
        public List<FullTestResult> FullTestResults { get; set; } = new List<FullTestResult>();
        public required string Title { get; set; }
        public int Time { get; set; }
        public int ViewCount { get; set; }
        public int? SeriesId { get; set; }
        public Series? Series { get; set; }
    }
}