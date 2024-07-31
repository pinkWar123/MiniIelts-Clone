using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Validators
{
    public class QuestionSubmitValidator : AbstractValidator<QuestionSubmitDto>
    {
        public QuestionSubmitValidator()
        {
            RuleFor(x => x.Order).GreaterThanOrEqualTo(1);
        }
    }
}