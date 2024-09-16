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
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Authentication;
using MiniIeltsCloneServer.Models.Dtos.User;
using MiniIeltsCloneServer.Services.TokenService;
using MiniIeltsCloneServer.Settings;
using MiniIeltsCloneServer.Validators.Authentication;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly ITokenService _tokenService;
        public UserService(
            ApplicationDbContext context,
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole> roleManager,
        ITokenService tokenService,
        IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
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
            var user = await _userManager.FindByNameAsync(currentUserName);
           return user; 
        }

        public async Task<UserViewDto?> GetUserViewDto()
        {
            var user = await GetCurrentUser();
            if(user == null) throw new UnauthorizedAccessException();
            var roles = await _userManager.GetRolesAsync(user);
            return new UserViewDto
            {
                Message = "Get current user",
                IsAuthenticated = true,
                Username = user.UserName,
                Email = user.Email,
                Roles = roles as List<string>
            };
        }

        public async Task<UserViewDto> Login(LoginDto loginDto)
        {
            var userExisted = await _userManager.FindByNameAsync(loginDto.UserName);
            if (userExisted != null && await _userManager.CheckPasswordAsync(userExisted, loginDto.Password))
            {
                var token = await _tokenService.GenerateJwtToken(userExisted);
                var roles = await _userManager.GetRolesAsync(userExisted);

                var userViewDto = new UserViewDto();


                if(userExisted.RefreshTokens.Any(a => a.IsActive))
                {
                    var activeRefreshToken = userExisted.RefreshTokens.Where(a=> a.IsActive == true).FirstOrDefault();
                    userViewDto.RefreshToken = activeRefreshToken.Token;
                    userViewDto.RefreshTokenExpiration = activeRefreshToken.Expires;
                }
                else
                {
                    var newRefreshToken = _tokenService.GenerateRefreshToken();
                    userViewDto.RefreshToken = newRefreshToken.Token;
                    userViewDto.RefreshTokenExpiration = newRefreshToken.Expires;
                    userExisted.RefreshTokens.Add(newRefreshToken);
                    _context.Update(userExisted);
                    await _context.SaveChangesAsync();
                }

                userViewDto.Message = "Login successfully";
                userViewDto.IsAuthenticated = true;
                userViewDto.Username = userExisted.UserName;
                userViewDto.Email = userExisted.Email;
                userViewDto.Token = token;
                userViewDto.Roles = roles as List<string>;

                return userViewDto;
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

        public async Task<UserViewDto> RefreshTokens(string refreshToken)
        {
            var userViewDto = new UserViewDto();
            var user = await _context.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(r => r.Token == refreshToken));

            if(user == null)
            {
                return new UserViewDto
                {
                    IsAuthenticated = false,
                    Message = "Refresh token does not match any users"
                };
            }

            var currentRefreshToken = user.RefreshTokens.Single(r => r.Token == refreshToken);

            if(!currentRefreshToken.IsActive)
            {
                return new UserViewDto
                {
                    IsAuthenticated = false,
                    Message = "Refresh token is expired"
                };
            }

            currentRefreshToken.Revoked = DateTime.UtcNow;
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            _context.Update(user);
            await _context.SaveChangesAsync();

            var token = await _tokenService.GenerateJwtToken(user);
            var roles = await _userManager.GetRolesAsync(user);
            return new UserViewDto
            {
                IsAuthenticated = true,
                Message = "Refresh tokens successfully",
                Token = token,
                Username = user.UserName,
                Email = user.Email,
                Roles = roles as List<string>,
                RefreshToken = newRefreshToken.Token,
                RefreshTokenExpiration = newRefreshToken.Expires
            };
        }

        public Task Logout()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedData<UserInfoDto>> GetPagedUsers(UserQueryObject @object)
        {
            var query = _context.Users.AsQueryable();
            
            if(!String.IsNullOrEmpty(@object.UserName))
            {
                Console.WriteLine("Filter by user name");
                query = query.Where(x => x.UserName.ToLower().Contains(@object.UserName.ToLower()));
            }

            

            var roleFilteredQuery = query
                    .Join(_context.UserRoles, 
                            u => u.Id, 
                            ur => ur.UserId, 
                            (u, ur) => new { u, ur })
                    .Join(_context.Roles, 
                            u => u.ur.RoleId, 
                            r => r.Id, 
                            (ur, r) => new UserInfoDto
                            {
                                Username = ur.u.UserName,
                                Email = ur.u.Email,
                                Role = r.Name,
                                Id = ur.u.Id
                            });

            if(!String.IsNullOrEmpty(@object.Role))
            {
                Console.WriteLine("Filter by role");
                roleFilteredQuery = roleFilteredQuery.Where(r => r.Role == @object.Role);
            }

            var totalRecords = await roleFilteredQuery.CountAsync();    
                var users = await roleFilteredQuery
                            .OrderBy(u => u.Username)
                            .Skip((@object.PageNumber - 1) * @object.PageSize)
                            .Take(@object.PageSize)
                            .ToListAsync();
                return new PagedData<UserInfoDto>
                {
                    TotalRecords = totalRecords,
                    Value = users 
                };
            
        }
    }
}
