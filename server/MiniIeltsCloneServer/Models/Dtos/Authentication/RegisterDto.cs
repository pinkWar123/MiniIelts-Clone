using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Authentication
{
    public class RegisterDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? PasswordConfirm { get; set; }
        public string? Email { get; set; }

    }
}
