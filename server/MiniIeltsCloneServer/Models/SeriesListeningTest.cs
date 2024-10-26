using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class SeriesListeningTest
    {
        public int ListeningTestId { get; set; }
        public ListeningTest ListeningTest { get; set; }
        public int ListeningTestOrder { get; set; }
        public int SeriesId { get; set; }
        public Series Series { get; set; }
    }
}