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
            var pagedResponse = PaginationHelper.CreatePagedResponse(
                                seriesViewDtos.Value,
                                seriesViewDtos.TotalRecords, 
                                new Wrappers.Filter.PaginationFilter(queryObject.PageNumber, queryObject.PageSize),
                                _uriService,
                                Request.Path.Value);

            return Results.Ok(pagedResponse);
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdateSeriesById([FromRoute] int id, [FromBody] UpdateSeriesDto dto)
        {
            await _seriesService.UpdateSeriesById(id, dto);
            return Results.Accepted();
        }

        [HttpDelete("{id}")]
        public async Task<IResult> DeleteSeriesById([FromRoute] int id)
        {
            await _seriesService.DeleteSeriesById(id);
            return Results.Accepted();
        }

        [HttpGet("{id}/collection")]
        public async Task<IResult> GetCollectionsBySeriesId([FromRoute] int id)
        {
            var collections = await _seriesService.GetCollectionsBySeriesId(id);
            return Results.Ok(new Response<SeriesCollectionViewDto?>(collections));
        }

        [HttpGet("collection")]
        public async Task<IResult> GetSeriesCollections([FromQuery] SeriesQueryObject query)
        {
            var seriesViewDtos = await _seriesService.GetSeriesCollections(query);
            var pagedResponse = PaginationHelper.CreatePagedResponse(
                                seriesViewDtos.Value,
                                seriesViewDtos.TotalRecords, 
                                new Wrappers.Filter.PaginationFilter(query.PageNumber, query.PageSize),
                                _uriService,
                                Request.Path.Value);

            return Results.Ok(pagedResponse);
        }
    }
}