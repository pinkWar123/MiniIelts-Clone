using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Listening
{
    public class ListeningResult : Base
    {
        public int ListeningTestId { get; set; }
        public ListeningTest? ListeningTest { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
        public double Score { get; set; }
        public int Time { get; set; }
    }
}