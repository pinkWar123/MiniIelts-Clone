using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Statistic
{
    public class ScoreDistributionDetail
    {
        public double FloorScore { get; set; }
        public Int32 Number { get; set; }
    }
    public class ScoreDistribution
    {
        public List<ScoreDistributionDetail> ScoreDistributionDetails { get; set; } = new List<ScoreDistributionDetail>();
    }
}