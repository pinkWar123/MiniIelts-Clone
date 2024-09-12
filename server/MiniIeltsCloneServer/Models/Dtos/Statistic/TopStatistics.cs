using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Statistic
{
    public class TopTest
    {
        public required string Title { get; set; }
        public int ViewCount { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public class TopUser
    {
        public required string UserName { get; set; }
        public string Email { get; set; }
        public int TotalTestTakenTimes { get; set; }
    }

    public class TopStatistics
    {
        public List<TopTest> TopTests { get; set; } = new List<TopTest>();
        public List<TopUser> TopUsers { get; set; } = new List<TopUser>();
    }
}