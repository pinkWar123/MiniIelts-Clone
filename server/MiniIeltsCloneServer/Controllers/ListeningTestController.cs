using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Extensions;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;
using MiniIeltsCloneServer.Services.ListeningTestService;
using MiniIeltsCloneServer.Services.UriService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListeningTestController : ControllerBase
    {
        private readonly IUriService _uriService;
        private readonly IListeningTestService _listeningTestService;
        public ListeningTestController(IListeningTestService listeningTestService, IUriService uriService)
        {
            _listeningTestService = listeningTestService;
            _uriService = uriService;
        }
        [HttpPost]
        public async Task<IResult> CreateListeningTest([FromBody] CreateListeningTestDto dto)
        {
            await _listeningTestService.CreateListeningTest(dto);
            return Results.Created();
        }
        [HttpGet("{id}")]
        public async Task<IResult> GetListeningTestById([FromRoute] int id)
        {
            var test = await _listeningTestService.GetListeningTestById(id);
            return Results.Ok(new Response<ListeningTestViewDto>(test));
        }

        [HttpGet]
        public async Task<IResult> GetListeningTests([FromQuery] ListeningTestQueryObject query)
        {
            var listeningTests =  await _listeningTestService.GetListeningTests(query);
            var pagedResponse = PaginationHelper.CreatePagedResponse(listeningTests.Value, listeningTests.TotalRecords, new Wrappers.Filter.PaginationFilter(query.PageNumber, query.PageSize), _uriService, Request.Path.Value);
            return Results.Ok(pagedResponse);
        }

        [HttpGet("{id}/solution")]
        public async Task<IResult> GetListeningTestSolution([FromRoute] int id)
        {
            var listeningTest = await _listeningTestService.GetListeningTestKey(id);
            return Results.Ok(new Response<ListeningTestKeyDto>(listeningTest));
        }

        [HttpGet("{id}/result")]
        public async Task<IResult> GetListeningTestResult([FromRoute] int id)
        {
            var listeningTestResult = await _listeningTestService.GetListeningTestResultById(id);
            return Results.Ok(new Response<ListeningResultDto>(listeningTestResult));
        }

        [HttpPost("{id}")]
        public async Task<IResult> SubmitListeningTest([FromRoute] int id, [FromBody] Models.Dtos.Test.TestSubmitDto testSubmitDto)
        {
            var result = await _listeningTestService.SubmitTest(id, testSubmitDto);
            return Results.Ok(new Response<int>(result));
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdateListeningTestById([FromRoute] int id, [FromBody] UpdateListeningTestDto dto)
        {
            await _listeningTestService.UpdateListeningTest(id, dto);
            return Results.Accepted();
        }

        [HttpGet("regex/{word}")]
        public async Task<IResult> GetVariations([FromRoute] string word)
        {
            var words = word.GenerateAnswerVariations();
            return Results.Ok(words);
        }
    }
}