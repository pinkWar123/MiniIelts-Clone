using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Models.Dtos.Statistic;
using MiniIeltsCloneServer.Services.StatisticService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticService _statisticService;
        public StatisticController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }
        [HttpGet("total")]
        [Authorize]
        
        public async Task<IActionResult> GetTotalStatistics()
        {
            var result = await _statisticService.GetTotalStatistics();
            return Ok(new Response<TotalStatistics>(result));
        }

        [HttpGet("top")]
        [Authorize]
        public async Task<IActionResult> GetTopStatistics()
        {
            var result = await _statisticService.GetTopStatistics();
            return Ok(new Response<TopStatistics>(result));
        }

        [HttpGet("score-distribution")]
        [Authorize]
        public async Task<IActionResult> GetScoreDistribution()
        {
            var result = await _statisticService.GetScoreDistribution();
            return Ok(new Response<ScoreDistribution>(result));
        }

        [HttpGet("question-distribution")]
        [Authorize]
        public async Task<IActionResult> GetQuestionDistribution()
        {
            var result = await _statisticService.GetQuestionDistribution();
            return Ok(new Response<QuestionDistribution>(result));
        }

        [HttpGet("question-accuracy")]
        [Authorize]
        public async Task<IActionResult> GetQuestionAccuracies()
        {
            var result = await _statisticService.GetQuestionAccuracies();
            return Ok(new Response<Accuracy>(result));
        }
    }
}