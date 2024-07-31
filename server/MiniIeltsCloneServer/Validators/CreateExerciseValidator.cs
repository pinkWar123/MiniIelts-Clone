using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.Exercise;

namespace MiniIeltsCloneServer.Validators
{
    public class CreateExerciseValidator : AbstractValidator<CreateExerciseDto>
    {
        public CreateExerciseValidator()
        {
            RuleFor(x => x.Order)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(x => x.ExerciseType)
                .IsInEnum();

            RuleFor(x => x.StartQuestion)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(x => x.QuestionCount)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(x => x.EndQuestion)
                .NotEmpty()
                .GreaterThan(0)
                .Must((dto, endQuestion) => endQuestion == dto.StartQuestion + dto.QuestionCount - 1);

            When(x => x.Questions != null && x.Questions.Any(), () =>
            {
                RuleForEach(x => x.Questions).SetValidator(new CreateQuestionValidator());
            });

            When(x => x.ChooseManyChoices != null && x.ChooseManyChoices.Any(), () =>
            {
                RuleForEach(x => x.ChooseManyChoices).SetValidator(new CreateExerciseChoiceValidator());
            });
        }
    }
}
