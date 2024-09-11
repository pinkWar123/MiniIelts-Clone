using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;

namespace MiniIeltsCloneServer.Services.TokenService
{
    public interface ITokenService
    {
        public string GetUserIdFromToken(string token);
        public Task<string> GenerateJwtToken(AppUser appUser);
        RefreshToken GenerateRefreshToken();
        Task<bool> RevokeToken(string token);
    }
}
