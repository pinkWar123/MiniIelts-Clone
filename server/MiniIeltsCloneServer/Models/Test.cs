using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants;

namespace MiniIeltsCloneServer.Models
{
    public class Test : Base
    {
        public string? Title { get; set; }
        public string? Essay { get; set; }
        public string? Picture { get; set; }
        public int ViewCount { get; set; } = 0;
        public int QuestionCount { get; set; } = 0;
        public CategoryEnum Category { get; set; }
        public List<Excercise> Excercises { get; set; } = new List<Excercise>();
        public List<Result> Results { get; set; } = new List<Result>();

    }
}
