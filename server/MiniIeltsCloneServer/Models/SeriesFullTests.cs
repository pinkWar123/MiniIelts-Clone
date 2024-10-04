using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models
{
    public class SeriesFullTest
    {
        public int FullTestId { get; set; }
        public FullTest FullTest { get; set; }
        public int FullTestOrder { get; set; }
        public int SeriesId { get; set; }
        public Series Series { get; set; }
    }
}