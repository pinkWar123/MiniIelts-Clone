using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Services.FullTestService;
using MiniIeltsCloneServer.Services.UriService;
using MiniIeltsCloneServer.Wrappers;
using MiniIeltsCloneServer.Wrappers.Filter;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FullTestController : ControllerBase
    {
        private readonly IValidator<CreateFullTestDto> _createFullTestValidator;
        private readonly IValidator<SubmitFullTestDto> _submitFullTestValidator;
        private readonly IFullTestService _fullTestService;
        private readonly IUriService _uriService;
        public FullTestController(IValidator<CreateFullTestDto> createFullTestValidator, 
        IFullTestService fullTestService,
        IValidator<SubmitFullTestDto> submitFullTestValidator,
        IUriService uriService
        )
        {
            _createFullTestValidator = createFullTestValidator;
            _fullTestService = fullTestService;
            _submitFullTestValidator = submitFullTestValidator;
            _uriService = uriService;
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

        [HttpPost("{id}/submit")]
        [Authorize]
        public async Task<IResult> SubmitFullTest([FromRoute] int id, [FromBody] SubmitFullTestDto dto)
        {
            var validationResult = await _submitFullTestValidator.ValidateAsync(dto);
            if(!validationResult.IsValid)
            {
                return Results.ValidationProblem(validationResult.ToDictionary());
            }

            var result = await _fullTestService.SubmitFullTest(id, dto);

            return Results.Ok(new Response<int>(result));

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFullTestById([FromRoute] int id)
        {
            var fullTest = await _fullTestService.GetFullTestById(id);
            return Ok(new Response<FullTestViewDto>(fullTest));
        }

        [HttpGet("{id}/solution")]
        public async Task<IResult> GetFullTestSolution([FromRoute] int id)
        {
            var solution = await _fullTestService.GetFullTestKey(id);
            return Results.Ok(new Response<FullTestKeyDto>(solution));
        }

        [HttpPost("{id}/result")]
        [AllowAnonymous]
        public async Task<IResult> GetFullTestResultByQuery([FromRoute] int id, SubmitFullTestDto dto)
        {
            var result = await _fullTestService.GetFullTestResult(id, dto);
            return Results.Ok(new Response<FullTestResultDto>(result));
        }

        [HttpGet("result/{id}")]
        public async Task<IResult> GetFullTestResultById([FromRoute] int id)
        {
            var result = await _fullTestService.GetFullTestResultById(id);
            return Results.Ok(new Response<FullTestResultDto>(result));
        }

        [HttpGet]
        public async Task<IResult> GetFullTests([FromQuery] FullTestQueryObject @object)
        {
            var fullTests = await _fullTestService.GetFullTests(@object);
            var pagedResponse = PaginationHelper.CreatePagedResponse(fullTests.Value, fullTests.TotalRecords, new PaginationFilter(@object.PageNumber, @object.PageSize), _uriService, Request.Path.Value);
            return Results.Ok(pagedResponse);
        }

        [HttpGet("check-title")]
        public async Task<IResult> CheckNameExistence([FromQuery] string title)
        {
            var isExisted = await _fullTestService.HasNameExisted(title);
            return Results.Ok(new Response<bool>(isExisted));
        }
    }
}