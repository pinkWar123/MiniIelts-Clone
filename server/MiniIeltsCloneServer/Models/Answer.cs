using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class Answer : Base
    {
        public bool IsCorrect { get; set; }
        public string? Value { get; set; }
        public int ResultId { get; set; }
        public Result? Result { get; set; }
    }
}
