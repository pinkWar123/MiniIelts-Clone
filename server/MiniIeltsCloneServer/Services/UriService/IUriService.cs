using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Wrappers.Filter;

namespace MiniIeltsCloneServer.Services.UriService
{
    public interface IUriService
    {
        public Uri GetPageUri(PaginationFilter paginationFilter, string route);
    }
}