using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.FullTest
{
    public class CreateFullTestDto
    {
        public required string Title { get; set; }
        public string? Image { get; set; }
        public List<int> TestIds { get; set; } = new List<int>();
    }
}