using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Settings
{
    public class JWT
    {
        public string? SigningKey { get; set; }
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public double DurationInMinutes { get; set; }
    }
}
