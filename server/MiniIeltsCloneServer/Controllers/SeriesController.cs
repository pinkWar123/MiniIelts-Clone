using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models.Dtos.Series;
using MiniIeltsCloneServer.Services.SeriesService;
using MiniIeltsCloneServer.Services.UriService;
using MiniIeltsCloneServer.Validators;
using MiniIeltsCloneServer.Wrappers;
using Newtonsoft.Json;

namespace MiniIeltsCloneServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeriesController : ControllerBase
    {
        private readonly ISeriesService _seriesService;
        private readonly IUriService _uriService;
        private readonly AbstractValidator<CreateSeriesDto> createSeriesValidator = new CreateNewSeriesValidator();
        public SeriesController(ISeriesService seriesService, IUriService uriService)
        {
            _seriesService = seriesService;
            _uriService = uriService;
        }

        [HttpPost]
        public async Task<IResult> CreateNewSeries([FromBody] CreateSeriesDto dto)
        {
            var validateResult = await createSeriesValidator.ValidateAsync(dto);
            if(!validateResult.IsValid)
            {
                throw new FluentValidation.ValidationException(validateResult.Errors);
            }
            await _seriesService.CreateNewSeries(dto);
            return Results.Accepted();
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetSeriesById([FromRoute] int id)
        {
            var seriesViewDto = await _seriesService.GetSeriesById(id);
            return Results.Ok(new Response<SeriesViewDto>(seriesViewDto));
        }

        [HttpGet]
        public async Task<IResult> GetAllSeries([FromQuery] SeriesQueryObject queryObject)
        {
            var seriesViewDtos = await _seriesService.GetSeries(queryObject);
            var  a = seriesViewDtos.Value[0];
            Console.WriteLine(JsonConvert.SerializeObject(a));
            var pagedResponse = PaginationHelper.CreatePagedResponse(seriesViewDtos.Value.Select(x => new SeriesViewDto
            {
                Title = x.Title,
                Image = x.Image,
                CreatedOn = x.CreatedOn,
                TestCount = x.TestCount,
                Tests = x.Tests
            }).ToList()
                                , seriesViewDtos.TotalRecords, 
                                new Wrappers.Filter.PaginationFilter(queryObject.PageNumber, queryObject.PageSize),
                                _uriService,
                                Request.Path.Value);
            Console.WriteLine(JsonConvert.SerializeObject(pagedResponse));

            return Results.Ok(pagedResponse);
        }
    }
}