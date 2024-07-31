using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Authentication;
using MiniIeltsCloneServer.Services.TokenService;
using MiniIeltsCloneServer.Settings;
using MiniIeltsCloneServer.Validators.Authentication;

namespace MiniIeltsCloneServer.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly ITokenService _tokenService;
        public UserService(
        UserManager<AppUser> userManager,
        ITokenService tokenService,
        IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<UserViewDto> GetUserByToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                throw new ArgumentException("Token cannot be null or empty", nameof(token));
            }

            var userId = _tokenService.GetUserIdFromToken(token);
            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("Invalid token");
            }

            var user = await _userManager.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
            var roles = await _userManager.GetRolesAsync(user);
            if (user != null)
            {
                return new UserViewDto
                {
                    Message = "Find user by token successfully",
                    IsAuthenticated = true,
                    Username = user.UserName,
                    Email = user.Email,
                    Token = token,
                    Roles = roles as List<string>
                };
            }
            return new UserViewDto
            {
                Message = "User not found",
                IsAuthenticated = false,
            };
        }

        public async Task<AppUser?> GetCurrentUser()
        {
            var currentUserName = _httpContextAccessor?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (currentUserName == null) return null;
            return await _userManager.FindByNameAsync(currentUserName);

        }

        public async Task<UserViewDto> Login(LoginDto loginDto)
        {
            var userExisted = await _userManager.FindByNameAsync(loginDto.UserName);
            if (userExisted != null && await _userManager.CheckPasswordAsync(userExisted, loginDto.Password))
            {
                var token = await _tokenService.GenerateJwtToken(userExisted);
                var roles = await _userManager.GetRolesAsync(userExisted);
                return new UserViewDto
                {
                    Message = "Login successfully",
                    IsAuthenticated = true,
                    Username = userExisted.UserName,
                    Email = userExisted.Email,
                    Token = token,
                    Roles = roles as List<string>
                };
            }
            return new UserViewDto
            {
                Message = "Login failed",
                IsAuthenticated = false
            };
        }

        public async Task<UserViewDto> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };
            var userWithSameUsername = await _userManager.FindByNameAsync(user.UserName);
            if (userWithSameUsername == null)
            {
                var result = await _userManager.CreateAsync(user, registerDto.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "User");
                    var createdUser = await _userManager.FindByNameAsync(user.UserName);
                    var token = await _tokenService.GenerateJwtToken(createdUser);
                    return new UserViewDto
                    {
                        Message = "User created successfully",
                        IsAuthenticated = true,
                        Username = createdUser.UserName,
                        Email = createdUser.Email,
                        Token = token,
                        Roles = new List<string>() { "User" }
                    };
                }
            }
            return new UserViewDto
            {
                Message = "User created failed",
                IsAuthenticated = false
            };
        }
    }
}
