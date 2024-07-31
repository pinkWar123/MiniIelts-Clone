using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.Test;

namespace MiniIeltsCloneServer.Validators.Authentication
{
    public class TestSubmitValidator : AbstractValidator<TestSubmitDto>
    {
        public TestSubmitValidator()
        {
            RuleForEach(x => x.QuestionSubmitDtos)
                .SetValidator(new QuestionSubmitValidator());
        }
    }
}