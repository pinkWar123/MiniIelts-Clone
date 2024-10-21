using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.ExplanationRepo
{
    public class ExplanationRepository : GenericRepository<Explanation>, IExplanationRepository
    {
        public ExplanationRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}