using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Helpers
{
    public class QueryObject
    {
        public string? SortBy { get; set; }
        public bool IsDescending { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public static List<string> GetFilterExcludes()
        {
            return typeof(QueryObject).GetProperties().Select(x => x.Name).ToList();
        }
    }
}
