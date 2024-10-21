using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Constants.Permissions;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Services.TestService;
using MiniIeltsCloneServer.Services.UriService;
using MiniIeltsCloneServer.Validators;
using MiniIeltsCloneServer.Validators.Authentication;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;
        private readonly IUriService _uriService;
        private readonly IValidator<CreateTestDto> _createTestValidator;
        private readonly IValidator<UpdateTestDto> _updateTestValidator;
        public TestController(
            ITestService testService, 
            IValidator<CreateTestDto> createTestValidator,
            IValidator<UpdateTestDto> updateTestValidator, 
            IUriService uriService)
        {
            _testService = testService;
            _createTestValidator = createTestValidator;
            _updateTestValidator = updateTestValidator;
            _uriService = uriService;
        }
        [HttpPost]
        [AllowAnonymous]
        // [Authorize(Policy = TestPermission.CreateTest)]
        public async Task<IResult> CreateTest([FromBody] CreateTestDto createTestDto)
        {
            var validator = new CreateTestValidator();
            var validationResult = await validator.ValidateAsync(createTestDto);
            if (!validationResult.IsValid)
            {
                return Results.ValidationProblem(validationResult.ToDictionary());
            }
            await _testService.CreateTestAsync(createTestDto);
            return Results.Accepted();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateTest([FromRoute] int id,[FromBody] UpdateTestDto updateTestDto)
        {
            Console.WriteLine("Update test");
            var validationResult = await _updateTestValidator.ValidateAsync(updateTestDto);
            if(!validationResult.IsValid)
            {
                return BadRequest(validationResult.ToDictionary());
            }

            await _testService.UpdateTestAsync(id, updateTestDto);
            return Accepted();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllTests([FromQuery] TestQueryObject testQueryObject)
        {
            var tests = await _testService.GetAllTestSearch(testQueryObject);
            var pagedResponse = PaginationHelper.CreatePagedResponse(tests.Value, tests.TotalRecords, new Wrappers.Filter.PaginationFilter(testQueryObject.PageNumber, testQueryObject.PageSize), _uriService, Request.Path.Value);
            return Ok(pagedResponse);
        }

        [HttpGet("dropdown")]
        [AllowAnonymous]
        public async Task<IResult> GetTestDropDown([FromQuery] string testName)
        {
            var tests = await _testService.GetTestDropdownViewDtos(testName);
            return Results.Ok(new Response<List<TestDropdownViewDto>>(tests));
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTestById([FromRoute] int id)
        {
            var test = await _testService.GetTestById(id);
            if(test == null)
            {
                var response = new Response<TestViewDto>
                {
                    Data = null,
                    Succeeded = false,
                    Message = "Test not found"
                };
                return BadRequest(response);
            }
            return Ok(new Response<TestViewDto>(test));
        }

        [HttpPost("{id}/submit")]
        public async Task<IActionResult> SubmitTest([FromRoute] int id, [FromBody] TestSubmitDto testSubmitDto)
        {
            var validator = new TestSubmitValidator();
            var validatorResult = validator.ValidateAsync(testSubmitDto).Result;
            if(!validatorResult.IsValid)
            {
                throw new ValidationException(validatorResult.ToDictionary().ToString());
            }
            var result = await _testService.SubmitTest(id, testSubmitDto);
            return Ok(new Response<TestSubmitResultDto>(result));
        }

        [HttpPost("{id}/increment-viewcount")]
        [AllowAnonymous]
        public async Task<IActionResult> IncrementTestViewCount([FromRoute] int id)
        {
            await _testService.IncrementTestViewCount(id);
            return Accepted();
        }

        [HttpPost("{id}/result")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTestResult([FromRoute] int id, [FromBody] TestSubmitDto testSubmitDto)
        {
            var validator = new TestSubmitValidator();
            var validatorResult = validator.ValidateAsync(testSubmitDto).Result;
            if(!validatorResult.IsValid)
            {
                throw new ValidationException(validatorResult.ToDictionary().ToString());
            }

            var result = await _testService.GetTestResult(id, testSubmitDto);

            return Ok(new Response<TestResultDto>(result));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestById([FromRoute] int id)
        {
            await _testService.DeleteTestById(id);
            return NoContent();
        }

        [HttpGet("{id}/explanation")]
        public async Task<IActionResult> GetTestWithExplanationsById([FromRoute] int id)
        {
            var test = await _testService.GetTestWithExplanations(id);
            if(test == null)
            {
                var response = new Response<TestViewDto>
                {
                    Data = null,
                    Succeeded = false,
                    Message = "Test not found"
                };
                return BadRequest(response);
            }
            return Ok(new Response<TestViewDto>(test));
        }

        [HttpPut("explanation")]
        public async Task<IResult> UpdateTestExplanation([FromBody] UpdateTestExplanationDto dto)
        {
            await _testService.UpdateExplanation(dto);
            return Results.Accepted();            
        }
    }
}
