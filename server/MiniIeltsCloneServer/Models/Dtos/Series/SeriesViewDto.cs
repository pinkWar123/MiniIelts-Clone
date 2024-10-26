using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;

namespace MiniIeltsCloneServer.Models.Dtos.Series
{
    public class FullTestNameDto
    {
        public required string Title { get; set; }
        public int Id { get; set; }
    }
    public class SeriesViewDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Image { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<FullTestNameDto> Tests { get; set; } = new List<FullTestNameDto>();
        public List<ListeningDropDownDto> ListeningTests { get; set; } = new List<ListeningDropDownDto>();
        public int TestCount { get; set; }
    }
}