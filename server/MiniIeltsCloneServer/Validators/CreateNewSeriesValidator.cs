using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MiniIeltsCloneServer.Models.Dtos.Series;

namespace MiniIeltsCloneServer.Validators
{
    public class CreateNewSeriesValidator : AbstractValidator<CreateSeriesDto>
    {
        public CreateNewSeriesValidator()
        {
            RuleFor(c => c.Title).NotEmpty();
        }
    }
}