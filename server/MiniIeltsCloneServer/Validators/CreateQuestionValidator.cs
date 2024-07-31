using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Validators
{
    public class CreateQuestionValidator : AbstractValidator<CreateQuestionDto>
    {
        public CreateQuestionValidator()
        {
            RuleFor(x => x.QuestionType).IsInEnum();
            RuleFor(x => x.Answer).NotEmpty();
            RuleFor(x => x.Order).GreaterThan(0);
            When(x => x.Choices != null && x.Choices.Any(), () =>
            {
                RuleForEach(x => x.Choices).SetValidator(new CreateQuestionChoiceValidator());
            });
        }
    }
}
