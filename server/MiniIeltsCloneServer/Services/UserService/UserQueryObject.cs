using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Helpers;

namespace MiniIeltsCloneServer.Services.UserService
{
    public class UserQueryObject : QueryObject
    {
        public string? UserName { get; set; }
        public string? Role { get; set; }
    }
}