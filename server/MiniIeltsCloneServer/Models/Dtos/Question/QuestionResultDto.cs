using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Question
{
    public class QuestionResultDto
    {
        public int Order { get; set; }
        public required string UserAnswer { get; set; }
        public required string Answer { get; set; }
        public bool IsTrue { get; set; }

    }
}