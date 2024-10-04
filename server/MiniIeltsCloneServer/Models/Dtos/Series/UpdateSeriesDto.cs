using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Series
{
    public class UpdateSeriesDto
    {
        public string? Image { get; set; }
        public required string Title { get; set; }
        public List<int> FullTestIds { get; set; } = new List<int>();
    }
}