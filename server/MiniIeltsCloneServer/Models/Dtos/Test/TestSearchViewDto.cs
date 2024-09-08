using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Test
{
    public class TestSearchViewDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Picture { get; set; }
        public int ViewCount { get; set; }
        public int QuestionCount { get; set; }
    }
}