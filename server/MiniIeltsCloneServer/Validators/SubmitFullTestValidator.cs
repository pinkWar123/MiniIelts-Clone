using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.FullTest;

namespace MiniIeltsCloneServer.Validators
{
    public class SubmitFullTestValidator : AbstractValidator<SubmitFullTestDto>
    {
        public SubmitFullTestValidator()
        {
            RuleForEach(x => x.Answers).Must(a => a.Order >= 1);
            RuleFor(x => x.Answers).Must(a => a.Count == 40);
        }
    }
}