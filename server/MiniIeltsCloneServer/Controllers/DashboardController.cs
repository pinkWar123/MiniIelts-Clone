using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models.Dtos.Dashboard;
using MiniIeltsCloneServer.Services.DashboardService;
using MiniIeltsCloneServer.Services.UriService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        private readonly IUriService _uriService;

        public DashboardController(IDashboardService dashboardService, IUriService uriService)
        {
            _dashboardService = dashboardService;
            _uriService = uriService;
        }

        [HttpGet("overall-result")]
        [Authorize]
        public async Task<IActionResult> GetOverallResult()
        {
            var result = await _dashboardService.GetOverallEvaluation();
            return Ok(new Response<Performance>(result));
        }

        [HttpGet("overall-result/{id}")]
        [Authorize]
        public async Task<IActionResult> GetOverallResult([FromRoute] string id)
        {
            var result = await _dashboardService.GetOverallEvaluationByAdmin(id);
            return Ok(new Response<Performance>(result));
        }

        [HttpGet("test/history")]
        [Authorize]
        public async Task<IActionResult> GetTestHistory([FromQuery] DashboardQueryObject @object)
        {
            var result = await _dashboardService.GetTestHistory(@object);
            var pagedResponse = PaginationHelper.CreatePagedResponse(result.Value, result.TotalRecords, new Wrappers.Filter.PaginationFilter(@object.PageNumber, @object.PageSize), _uriService, Request?.Path.Value ?? "");
            return Ok(pagedResponse);
        }

        [HttpGet("full-test/history")]
        [Authorize]
        public async Task<IActionResult> GetFullTestHistory([FromQuery] DashboardQueryObject @object)
        {
            var result = await _dashboardService.GetFullTestHistory(@object);
            var pagedResponse = PaginationHelper.CreatePagedResponse(result.Value, result.TotalRecords, new Wrappers.Filter.PaginationFilter(@object.PageNumber, @object.PageSize), _uriService, Request?.Path.Value ?? "");
            return Ok(pagedResponse);
        }

        [HttpGet("listening/history")]
        public async Task<IResult> GetListeningTestHistory([FromQuery] DashboardQueryObject @object)
        {
            var result = await _dashboardService.GetListeningTestHistory(@object);
            var pagedResponse = PaginationHelper.CreatePagedResponse(result.Value, result.TotalRecords, new Wrappers.Filter.PaginationFilter(@object.PageNumber, @object.PageSize), _uriService, Request?.Path.Value ?? "");
            return Results.Ok(pagedResponse);
        }

        [HttpGet("history/{id}")]
        [Authorize]
        public async Task<IActionResult> GetTestHistory([FromRoute] string id, [FromQuery] DashboardQueryObject @object)
        {
            var result = await _dashboardService.GetTestHistoryByAdmin(id, @object);
            var pagedResponse = PaginationHelper.CreatePagedResponse(result.Value, result.TotalRecords, new Wrappers.Filter.PaginationFilter(@object.PageNumber, @object.PageSize), _uriService, Request?.Path.Value ?? "");
            return Ok(pagedResponse);
        }

        [HttpGet("question-statistics")]
        public async Task<IActionResult> GetQuestionStatistics()
        {
            var result = await _dashboardService.GetQuestionStatistics();
            return Ok(new Response<List<QuestionStatistics>>(result));
        }

        [HttpGet("question-statistics/{id}")]
        public async Task<IActionResult> GetQuestionStatistics([FromRoute] string id)
        {
            var result = await _dashboardService.GetQuestionStatisticsByAdmin(id);
            return Ok(new Response<List<QuestionStatistics>>(result));
        }
    }
}