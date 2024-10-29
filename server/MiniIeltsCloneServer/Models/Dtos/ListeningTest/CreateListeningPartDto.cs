using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.ListeningTest
{
    public class CreateListeningPartDto
    {
        public List<CreateListeningExerciseDto> ListeningExercises { get; set; } = new List<CreateListeningExerciseDto>();
        public string Transcript { get; set; }
    }
}