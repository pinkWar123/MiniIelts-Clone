using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Helpers;

namespace MiniIeltsCloneServer.Services.TestService
{
    public class TestQueryObject : QueryObject
    {
        public List<QuestionTypeEnum>? QuestionType { get; set; } = new List<QuestionTypeEnum>();
        public QuestionSortEnum? QuestionSort { get; set; }
        public string? Title { get; set; }
    }
}
