using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class ListeningTest : Base
    {
        public required string Title { get; set; }
        public required string VideoId { get; set; } // This field stores the video id of youtube
        public List<ListeningPart> ListeningParts { get; set; } = new List<ListeningPart>();
    }
}