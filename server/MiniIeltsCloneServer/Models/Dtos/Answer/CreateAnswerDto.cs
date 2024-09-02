using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Answer
{
    public class CreateAnswerDto
    {
        public bool IsCorrect { get; set; }
        public string? Value { get; set; }
        public int ResultId { get; set; }
    }
}