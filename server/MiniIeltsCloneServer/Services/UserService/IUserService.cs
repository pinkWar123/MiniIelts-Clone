using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Authentication;
using MiniIeltsCloneServer.Validators.Authentication;

namespace MiniIeltsCloneServer.Services.UserService
{
    public interface IUserService
    {
        Task<UserViewDto> Login(LoginDto loginDto);
        Task<UserViewDto> Register(RegisterDto registerDto);
        Task<UserViewDto> GetUserByToken(string token);
        Task<AppUser?> GetCurrentUser();
    }
}
