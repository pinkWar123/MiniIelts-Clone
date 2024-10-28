using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Series
{
    public class CollectionViewDto
    {
        public required string Title { get; set; }
        public int ReadingTestId { get; set; }
        public int ListeningTestId { get; set; }
        public int Order { get; set; }
    }
}