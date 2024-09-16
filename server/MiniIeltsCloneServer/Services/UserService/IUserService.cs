using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Authentication;
using MiniIeltsCloneServer.Models.Dtos.User;
using MiniIeltsCloneServer.Validators.Authentication;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Services.UserService
{
    public interface IUserService
    {
        Task<UserViewDto> Login(LoginDto loginDto);
        Task<UserViewDto> Register(RegisterDto registerDto);
        Task<UserViewDto> GetUserByToken(string token);
        Task<UserViewDto> RefreshTokens(string refreshToken);
        Task<AppUser?> GetCurrentUser();
        Task<UserViewDto?> GetUserViewDto();
        Task<PagedData<UserInfoDto>> GetPagedUsers(UserQueryObject @object);
        Task Logout();
    }
}
