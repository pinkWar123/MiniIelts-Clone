using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Question
{
    public class CreateExplanationDto
    {
        public int QuestionId { get; set; }
        public required string Content { get; set; }
    }
}