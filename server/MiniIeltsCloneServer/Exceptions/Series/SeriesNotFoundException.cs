using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Exceptions.Series
{
    public class SeriesNotFoundException : BaseException
    {
        public SeriesNotFoundException(int seriesId, HttpStatusCode statusCode = HttpStatusCode.BadRequest) 
            : base($"Series with id {seriesId} not found", statusCode)
        {
        }
    }
}