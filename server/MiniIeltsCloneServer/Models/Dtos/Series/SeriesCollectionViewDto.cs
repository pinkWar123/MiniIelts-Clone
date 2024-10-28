using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Series
{
    public class SeriesCollectionViewDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Image { get; set; }
        public List<CollectionViewDto> Collections { get; set; } = new List<CollectionViewDto>();
    }
}