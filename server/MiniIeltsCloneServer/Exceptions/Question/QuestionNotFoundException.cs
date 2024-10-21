using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Exceptions.Question
{
    public class QuestionNotFoundException : BaseException
    {
        public QuestionNotFoundException(int id, HttpStatusCode statusCode = HttpStatusCode.NotFound) : base($"Question with id {id} not found", statusCode)
        {
        }
    }
}