using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Result
{
    public class ResultViewDto : Base
    {
        public int TestId { get; set; }
        public List<Models.Answer> Answers { get; set; } = new List<Models.Answer>();
        public double Score { get; set; }
    }
}