using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Exceptions.FullTest
{
    public class FullTestNotFoundException : BaseException
    {
        public FullTestNotFoundException(int id
        , HttpStatusCode statusCode = HttpStatusCode.NotFound) 
        : base($"Full test with id {id} not found", statusCode)
        {
        }
    }
}