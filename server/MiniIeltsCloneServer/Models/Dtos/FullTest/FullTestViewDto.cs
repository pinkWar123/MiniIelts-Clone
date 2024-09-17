using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Test;

namespace MiniIeltsCloneServer.Models.Dtos.FullTest
{
    public class FullTestViewDto
    {
        public required string Title { get; set; }
        public string? Image { get; set; }
        public List<TestViewDto> Tests { get; set; } = new List<TestViewDto>();
    }
}