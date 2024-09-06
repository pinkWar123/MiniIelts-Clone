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

        [HttpGet("history")]
        [Authorize]
        public async Task<IActionResult> GetTestHistory([FromQuery] DashboardQueryObject @object)
        {
            var result = await _dashboardService.GetTestHistory(@object);
            var pagedResponse = PaginationHelper.CreatePagedResponse(result, new Wrappers.Filter.PaginationFilter(@object.PageNumber, @object.PageSize), _uriService, Request.Path.Value);
            return Ok(pagedResponse);
        }

        [HttpGet("question-statistics")]
        public async Task<IActionResult> GetQuestionStatistics()
        {
            var result = await _dashboardService.GetQuestionStatistics();
            return Ok(new Response<List<QuestionStatistics>>(result));
        }
    }
}