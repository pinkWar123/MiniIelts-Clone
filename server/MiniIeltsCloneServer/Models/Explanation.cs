using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class Explanation : Base
    {
        public required string Content { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}