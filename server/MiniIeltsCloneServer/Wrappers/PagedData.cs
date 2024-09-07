using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Wrappers
{
    public class PagedData<K>
    {
        public int TotalRecords { get; set; }
        public List<K> Value { get; set; } = new List<K>();
    }
}