using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Hangfire;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using MiniIeltsCloneServer.Extensions;
using MiniIeltsCloneServer.Models.Dtos.Statistic;
using MiniIeltsCloneServer.Services.HangfireService;
using MiniIeltsCloneServer.Services.StatisticService;
using System.Text;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HangfireController : ControllerBase
    {
        private readonly IHangfireService _hangfireService;
        private readonly IDistributedCache _cache;
        public HangfireController(IHangfireService hangfireService, IDistributedCache cache)
        {
            _hangfireService = hangfireService;
            _cache = cache;
        }
        [HttpPost]
        [Route("question-accuracies")]
        public IActionResult CacheQuestionAccuracies()
        {
            RecurringJob.AddOrUpdate("CacheQuestionAccuracies", 
                                () => _hangfireService.CacheQuestionAccuracies()
                                , "0 */6 * * *");
            return Ok();
        }

        [HttpPost]
        [Route("question-distribution")]
        public IActionResult CacheQuestionDistribution()
        {
            RecurringJob.AddOrUpdate("CacheQuestionDistribution", 
                                () => _hangfireService.CacheQuestionDistribution()
                                , "0 */6 * * *");
            return Ok();
        }

        [HttpPost]
        [Route("score-distribution")]
        public IActionResult CacheScoreDistribution()
        {
            RecurringJob.AddOrUpdate("CacheScoreDistribution", 
                            () => _hangfireService.CacheScoreDistribution(), 
                            "0 */6 * * *");
            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("redis-get")]
        public async Task<IActionResult> GetRedisValue(string key)
        {
            var cachedData = await _cache.GetAsync(key);
    
            // Check if the data exists in the cache
            if (cachedData == null)
            {
                return NotFound(); // Return null if not found
            }

            // Deserialize the byte array to the original object type
            var jsonString = Encoding.UTF8.GetString(cachedData);
            return Ok(jsonString);
            // return Ok(deserializedValue);
        }

        [HttpDelete]
        [AllowAnonymous]
        [Route("redis-delete")]
        public async Task<IActionResult> DeleteRedisValue(string key)
        {
            await _cache.RemoveAsync(key);
            return Ok();
        }

        [HttpDelete]
        [AllowAnonymous]
        public IActionResult RemoveJob(string jobId)
        {
            BackgroundJob.Delete(jobId);
            RecurringJob.RemoveIfExists(jobId);
            return Ok();
        }
    }
}