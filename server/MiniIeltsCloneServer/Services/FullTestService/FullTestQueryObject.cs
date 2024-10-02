using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Helpers;

namespace MiniIeltsCloneServer.Services.FullTestService
{
    public class FullTestQueryObject : QueryObject
    {
        public string? Title { get; set; }
        public string? OrderBy { get; set; }
    }
}