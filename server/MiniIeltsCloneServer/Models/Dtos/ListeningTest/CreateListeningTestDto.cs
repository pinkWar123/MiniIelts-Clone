using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.ListeningTest
{
    public class CreateListeningTestDto
    {
        public required string Title { get; set; }
        public required string VideoId { get; set; } // This field stores the video id of youtube
        public List<CreateListeningPartDto> ListeningParts { get; set; } = new List<CreateListeningPartDto>();
    }
}