using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Series;

namespace MiniIeltsCloneServer.Mapping
{
    public class SeriesProfile : Profile
    {
        // public SeriesProfile()
        // {
        //     CreateMap<Series, SeriesViewDto>()
        //         .ForMember(dest => dest.Tests, opt => opt.MapFrom(src => src.SeriesFullTests.Select(test => new FullTestNameDto
        //         {
        //             Title = test.Title,
        //             Id = test.Id // Assuming FullTest has an Id property
        //         }).ToList()));
        // }
    }
}