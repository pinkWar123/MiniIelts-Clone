using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.SeriesFullTestRepo
{
    public class SeriesFullTestRepository : GenericRepository<SeriesFullTest>, ISeriesFullTestRepository
    {
        public SeriesFullTestRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}