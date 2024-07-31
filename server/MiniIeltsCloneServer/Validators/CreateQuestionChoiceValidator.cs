using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.QuestionChoice;

namespace MiniIeltsCloneServer.Validators
{
    public class CreateQuestionChoiceValidator : AbstractValidator<CreateQuestionChoiceDto>
    {
        public CreateQuestionChoiceValidator()
        {
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.Order).GreaterThan(0);
        }
    }
}
