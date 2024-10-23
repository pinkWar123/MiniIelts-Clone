using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;
using MiniIeltsCloneServer.Services.ListeningTestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListeningTestController : ControllerBase
    {
        private readonly IListeningTestService _listeningTestService;
        public ListeningTestController(IListeningTestService listeningTestService)
        {
            _listeningTestService = listeningTestService;
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
    }
}