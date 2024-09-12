using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Constants;

namespace MiniIeltsCloneServer.Models.Dtos.Statistic
{
    public class QuestionDistributionDetail
    {
        public QuestionTypeEnum QuestionType { get; set; }
        public double Distribution { get; set; }
    }
    public class QuestionDistribution
    {
        public List<QuestionDistributionDetail> QuestionDistributionDetails { get; set; } = new List<QuestionDistributionDetail>();
    }
}