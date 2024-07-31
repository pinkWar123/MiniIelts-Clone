using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.ExerciseChoiceRepo
{
    public class ExerciseChoiceRepository : GenericRepository<ExerciseChoice>, IExerciseChoiceRepository
    {
        public ExerciseChoiceRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}
