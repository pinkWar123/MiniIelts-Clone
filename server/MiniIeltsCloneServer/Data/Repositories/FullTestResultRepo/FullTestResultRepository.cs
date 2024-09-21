using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.FullTestResultRepo
{
    public class FullTestResultRepository : GenericRepository<FullTestResult>, IFullTestResultRepository
    {
        public FullTestResultRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}