using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Exceptions.Post
{
    public class PostNotFoundException : BaseException
    {
        public PostNotFoundException(int id, HttpStatusCode statusCode = HttpStatusCode.BadRequest) 
            : base($"Post with id {id} not found", statusCode)
        {
        }
    }
}