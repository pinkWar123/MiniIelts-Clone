using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.AnswerRepo
{
    public class AnswerRepository : GenericRepository<Answer>, IAnswerRepository
    {
        public AnswerRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}