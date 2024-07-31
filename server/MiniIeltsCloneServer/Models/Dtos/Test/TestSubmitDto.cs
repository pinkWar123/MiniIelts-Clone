using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Models.Dtos.Test
{
    public class TestSubmitDto
    {
        public List<QuestionSubmitDto> QuestionSubmitDtos {get; set;} = new List<QuestionSubmitDto>();
    }
}