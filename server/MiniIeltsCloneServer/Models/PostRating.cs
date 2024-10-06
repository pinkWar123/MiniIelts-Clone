using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MiniIeltsCloneServer.Models
{
    [Owned]
    public class PostRating : Base
    {
        public int PostId { get; set; }
        public Post Post { get; set; }
        public double Rating { get; set; }
    }
}