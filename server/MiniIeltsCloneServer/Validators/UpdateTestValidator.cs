using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.Test;

namespace MiniIeltsCloneServer.Validators
{
    
    public class UpdateTestValidator : AbstractValidator<UpdateTestDto>
    {
        public UpdateTestValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Essay).NotEmpty();
            RuleFor(x => x.Picture).NotEmpty();
            RuleFor(x => x.QuestionCount).InclusiveBetween(1, 14).WithMessage("Number of questions must be between 1 and 14");
            RuleFor(x => x.Category).IsInEnum();

            RuleForEach(x => x.Excercises).SetValidator(new CreateExerciseValidator());
        }
    }
    
}