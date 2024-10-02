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
        public List<FullTest> Tests { get; set; } = new List<FullTest>();
        public int TestCount { get; set; }
    }
}