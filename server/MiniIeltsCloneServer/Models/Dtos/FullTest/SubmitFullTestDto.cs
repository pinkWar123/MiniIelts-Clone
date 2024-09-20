using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Models.Dtos.FullTest
{
    public class SubmitFullTestDto
    {
        public List<QuestionSubmitDto> Answers { get; set; } = new List<QuestionSubmitDto>();
    }
}