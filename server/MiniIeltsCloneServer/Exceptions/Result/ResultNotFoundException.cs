using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Exceptions.Result
{
    public class ResultNotFoundException : BaseException
    {
        public ResultNotFoundException(int resultId, HttpStatusCode statusCode = HttpStatusCode.InternalServerError) : base($"Result with id {resultId} can not be found", statusCode)
        {
        }
    }
}