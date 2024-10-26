using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.ListeningTest;
using MiniIeltsCloneServer.Models.Listening;

namespace MiniIeltsCloneServer.Mapping
{
    public class ListeningTestProfile : Profile
    {
        public ListeningTestProfile()
        {
            CreateMap<CreateListeningTestDto, ListeningTest>();
            CreateMap<CreateListeningExerciseDto, ListeningExercise>();
            CreateMap<CreateListeningPartDto, ListeningPart>();
            CreateMap<ListeningTest, ListeningTestViewDto>();
            CreateMap<ListeningPart, ListeningPartViewDto>();
            CreateMap<ListeningExercise, ListeningExerciseViewDto>();
        }
    }
}