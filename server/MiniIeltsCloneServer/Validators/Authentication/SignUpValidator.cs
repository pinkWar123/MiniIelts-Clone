using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models.Dtos.Authentication;

namespace MiniIeltsCloneServer.Validators.Authentication
{
    public class SignUpValidator : AbstractValidator<RegisterDto>
    {
        public SignUpValidator()
        {
            RuleFor(x => x.Username).NotEmpty().MinimumLength(6);
            RuleFor(x => x.Password).NotEmpty().MinimumLength(12).Must(Password.IsValidPassword);
            RuleFor(x => x.Email).EmailAddress();
            RuleFor(x => x.PasswordConfirm).NotEmpty().Equal(x => x.Password);
        }
    }
}
