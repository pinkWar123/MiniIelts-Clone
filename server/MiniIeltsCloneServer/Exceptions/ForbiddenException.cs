using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Exceptions
{
    public class ForbiddenException : BaseException
    {
        public ForbiddenException(string message = "You are not allowed to access this resource", HttpStatusCode statusCode = HttpStatusCode.Forbidden) : base(message, statusCode)
        {
        }
    }
}