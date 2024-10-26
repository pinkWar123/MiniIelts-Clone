using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Helpers;

namespace MiniIeltsCloneServer.Services.ListeningTestService
{
    public class ListeningTestQueryObject : QueryObject
    {
        public string? Title { get; set; }
        public string? OrderBy { get; set; }
    }
}