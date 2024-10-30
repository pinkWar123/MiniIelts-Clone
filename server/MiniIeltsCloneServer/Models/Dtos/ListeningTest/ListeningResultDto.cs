using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.FullTest;

namespace MiniIeltsCloneServer.Models.Dtos.ListeningTest
{
    public class ListeningResultDto : FullTestResultDto
    {
        public string VideoId { get; set; }
        public List<string> Transcripts { get; set; }
    }
}