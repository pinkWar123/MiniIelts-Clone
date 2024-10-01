using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Exceptions.FullTestResult
{
    public class FullTestResultConflictLengthException : BaseException
    {
        public FullTestResultConflictLengthException(int id, HttpStatusCode statusCode = HttpStatusCode.InternalServerError) : base($"Full test ${id} has the number of questions different from the number of answers", statusCode)
        {
        }
    }
}