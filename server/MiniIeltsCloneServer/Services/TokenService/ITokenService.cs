using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;

namespace MiniIeltsCloneServer.Services.TokenService
{
    public interface ITokenService
    {
        string GetUserIdFromToken(string token);
        Task<string> GenerateJwtToken(AppUser appUser);
    }
}
