using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Listening;

namespace MiniIeltsCloneServer.Models
{
    public class ListeningTest : Base
    {
        public required string Title { get; set; }
        public required string VideoId { get; set; } // This field stores the video id of youtube
        public ListeningResult ListeningResult { get; set; }
        public List<ListeningPart> ListeningParts { get; set; } = new List<ListeningPart>();
        public List<SeriesListeningTest> SeriesListeningTests { get; set; }= new List<SeriesListeningTest>();
    }
}