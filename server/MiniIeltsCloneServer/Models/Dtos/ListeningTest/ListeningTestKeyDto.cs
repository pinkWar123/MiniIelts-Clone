using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.FullTest;

namespace MiniIeltsCloneServer.Models.Dtos.ListeningTest
{
    public class ListeningTestKeyDto
    {
        public int ListeningTestId { get; set; }
        public List<string> Transcripts { get; set; }
        public string VideoId { get; set; }
        public required string Title { get; set; }
        public int QuestionCount { get; set; }
        public List<TestKeyDto> TestKeys { get; set; } = new List<TestKeyDto>();
        public DateTime CreatedOn { get; set; }
        public int ViewCount { get; set; }
    }
}