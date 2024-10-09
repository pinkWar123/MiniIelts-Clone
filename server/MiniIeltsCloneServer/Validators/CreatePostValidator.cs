using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Post;

namespace MiniIeltsCloneServer.Validators
{
    public class CreatePostValidator : AbstractValidator<CreatePostDto>
    {
        public CreatePostValidator()
        {
            RuleFor(c => c.Title).NotEmpty().MinimumLength(10).MaximumLength(100);
            RuleFor(c => c.Content).NotEmpty().MinimumLength(100);
        }
    }
}