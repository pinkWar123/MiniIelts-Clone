using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Settings;

namespace MiniIeltsCloneServer.Services.TokenService
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;
        private readonly JWT _jwt;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TokenService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context, IOptions<JWT> jWT, IHttpContextAccessor httpContextAccessor)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
            _jwt = jWT.Value;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<string> GenerateJwtToken(AppUser appUser)
        {
            var userClaims = await _userManager.GetClaimsAsync(appUser);
            var roles = await _userManager.GetRolesAsync(appUser);
            var roleClaims = new List<Claim>();
            foreach (var role in roles)
            {
                var identityRole = await _roleManager.FindByNameAsync(role);
                if (identityRole == null) continue;
                var _claims = await _roleManager.GetClaimsAsync(identityRole);
                foreach (var roleClaim in _claims)
                {
                    roleClaims.Add(new Claim(roleClaim.Type, roleClaim.Value));
                }
            }
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, appUser.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, appUser.Id)
            }.Union(userClaims).Union(roleClaims);
            var userRoles = await _userManager.GetRolesAsync(appUser);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.SigningKey));
            Console.WriteLine($"Duration In Minute: {_jwt.DurationInMinutes}");
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public RefreshToken GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using(var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(randomNumber);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomNumber),
                    Expires = DateTime.UtcNow.AddDays(10),
                    Created = DateTime.UtcNow
                };
            }
        }

        

        public string GetUserIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jwtToken == null)
                return null;

            var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
            return userIdClaim?.Value;
        }

        public async Task<bool> RevokeToken(string token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshTokens.Any(r => r.Token == token));
            if (user == null) return false;

            var refreshToken = user.RefreshTokens.SingleOrDefault(r => r.Token == token);

            if(refreshToken == null || !refreshToken.IsActive) return false;

            refreshToken.Revoked = DateTime.UtcNow;
            _context.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
