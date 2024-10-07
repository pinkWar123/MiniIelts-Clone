using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public enum Skill
    {
        Listening,
        Reading,
        Writing,
        Speaking
    }
    public class Post : Base
    {
        public required string Content { get; set; }
        public required string Title { get; set; }
        public int ViewCount { get; set; }
        public List<PostRating> Ratings { get; set; } = new List<PostRating>();
        public string? Image { get; set; }
        public Skill Tag { get; set; }
    }
}