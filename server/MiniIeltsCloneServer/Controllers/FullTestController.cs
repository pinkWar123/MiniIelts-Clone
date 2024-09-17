using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Services.FullTestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FullTestController : ControllerBase
    {
        private readonly IValidator<CreateFullTestDto> _createFullTestValidator;
        private readonly IFullTestService _fullTestService;
        public FullTestController(IValidator<CreateFullTestDto> createFullTestValidator, IFullTestService fullTestService)
        {
            _createFullTestValidator = createFullTestValidator;
            _fullTestService = fullTestService;
        }
        [HttpPost]
        public async Task<IResult> CreateNewFullTest([FromBody] CreateFullTestDto dto)
        {
            var result = await _createFullTestValidator.ValidateAsync(dto);
            if(!result.IsValid)
            {
                return Results.ValidationProblem(result.ToDictionary());
            }

            await _fullTestService.CreateFullTest(dto);

            return Results.Accepted();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFullTestById([FromRoute] int id)
        {
            var fullTest = await _fullTestService.GetFullTestById(id);
            return Ok(new Response<FullTestViewDto>(fullTest));
        }
    }
}