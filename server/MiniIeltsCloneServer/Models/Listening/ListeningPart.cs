using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Listening;

namespace MiniIeltsCloneServer.Models
{
    public class ListeningPart : Base
    {
        public List<ListeningExercise> ListeningExercises { get; set; } = new List<ListeningExercise>();
        public int ListeningTestId { get; set; }
        public ListeningTest ListeningTest { get; set; }
    }
}