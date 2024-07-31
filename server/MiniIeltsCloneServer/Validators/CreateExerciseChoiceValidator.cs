using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.ExerciseChoice;

namespace MiniIeltsCloneServer.Validators
{
    public class CreateExerciseChoiceValidator : AbstractValidator<CreateExerciseChoiceDto>
    {
        public CreateExerciseChoiceValidator()
        {
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.Order).GreaterThan(0);
        }
    }
}
