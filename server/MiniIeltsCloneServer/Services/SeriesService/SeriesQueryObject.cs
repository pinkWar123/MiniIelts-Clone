using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Helpers;

namespace MiniIeltsCloneServer.Services.SeriesService
{
    public class SeriesQueryObject : QueryObject
    {
        public string? Title { get; set; }
    }
}