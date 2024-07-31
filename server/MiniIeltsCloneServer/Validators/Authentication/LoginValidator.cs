using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.Authentication;

namespace MiniIeltsCloneServer.Validators.Authentication
{
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(l => l.UserName).NotEmpty();
            RuleFor(l => l.Password).NotEmpty().MinimumLength(12).Must(IsValidPassword);
        }

        private bool IsValidPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return false;
            }

            bool hasDigit = password.Any(char.IsDigit);
            bool hasLowercase = password.Any(char.IsLower);
            bool hasUppercase = password.Any(char.IsUpper);
            bool hasNonAlphanumeric = password.Any(ch => !char.IsLetterOrDigit(ch));

            return hasDigit && hasLowercase && hasUppercase && hasNonAlphanumeric;
        }

    }
}
