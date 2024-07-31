using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Question
{
    public class QuestionSubmitDto
    {
        public int Order { get; set; }
        public required string Value { get; set; }
    }
}