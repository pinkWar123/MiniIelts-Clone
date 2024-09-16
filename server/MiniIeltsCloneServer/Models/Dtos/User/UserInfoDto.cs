using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.User
{
    public class UserInfoDto
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; } 
    }
}