using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Exceptions.FullTestResult
{
    public class FullTestResultNotFoundException : BaseException
    {
        public FullTestResultNotFoundException(int id, 
        HttpStatusCode statusCode = HttpStatusCode.BadRequest) 
        : base($"Full test result with id {id} not found", statusCode)
        {
        }
    }
}