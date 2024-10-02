using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.FullTest;

namespace MiniIeltsCloneServer.Validators.Authentication
{
    public class CreateFullTestValidator : AbstractValidator<CreateFullTestDto>
    {
        public CreateFullTestValidator()
        {
            RuleFor(c => c.Title).NotEmpty().WithMessage("Title is required");
            RuleFor(c => c.TestIds).Must(t => t.Count == 3).WithMessage("You have to choose 3 tests");
        }
    }
}