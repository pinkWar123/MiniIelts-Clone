using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class Series : Base
    {
        public required string Title { get; set; }
        public string? Image { get; set; }
        public List<SeriesFullTest> SeriesFullTests { get; set; } = new List<SeriesFullTest>();
        public List<SeriesListeningTest> SeriesListeningTests { get; set; } = new List<SeriesListeningTest>();
        public int TestCount { get; set; }
    }
}