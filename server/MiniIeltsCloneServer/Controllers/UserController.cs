using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Authentication;
using MiniIeltsCloneServer.Services.TokenService;
using MiniIeltsCloneServer.Services.UserService;
using MiniIeltsCloneServer.Validators.Authentication;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        public UserController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpGet("{token}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserByToken(string token)
        {
            var result = await _userService.GetUserByToken(token);
            if (result.IsAuthenticated) return Ok(result);
            return NotFound(result);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var validator = new LoginValidator();
            var validationResult = await validator.ValidateAsync(loginDto);
            if (!validationResult.IsValid)
            {
                return BadRequest(Results.ValidationProblem(validationResult.ToDictionary()));
            }
            var result = await _userService.Login(loginDto);
            SetRefreshTokenInCookie(result.RefreshToken);
            if (result.IsAuthenticated) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var validator = new SignUpValidator();
            var validationResult = await validator.ValidateAsync(registerDto);
            if (!validationResult.IsValid)
            {
                return BadRequest(Results.ValidationProblem(validationResult.ToDictionary()));
            }
            var result = await _userService.Register(registerDto);
            if (result.IsAuthenticated) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = await _userService.RefreshTokens(refreshToken);
            if(!string.IsNullOrEmpty(response.RefreshToken))
            {
                SetRefreshTokenInCookie(response.RefreshToken);
            }

            return Ok(response);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userService.GetUserViewDto();
            return Ok(user);
        }

        private void SetRefreshTokenInCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(10),
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}
