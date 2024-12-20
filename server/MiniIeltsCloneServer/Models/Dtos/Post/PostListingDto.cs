using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Post
{
    public class PostListingDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Image { get; set; }
        public required string Content { get; set; }
        public int ViewCount { get; set; }
        public Skill Tag { get; set; }
        public DateTime CreatedOn { get; set; }
        public RatingResult? RatingResult { get; set; }
    }
}