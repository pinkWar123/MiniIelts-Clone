using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Post
{
    public class RatingResult
    {
        public int RatingCount { get; set; }
        public double AverageRating { get; set; }
    }
    public class PostViewDto
    {
        public required string Content { get; set; }
        public required string Title { get; set; }
        public int ViewCount { get; set; }
        public required RatingResult RatingResult { get; set; }
        public string? Image { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public Skill Tag { get; set; }


    }
}