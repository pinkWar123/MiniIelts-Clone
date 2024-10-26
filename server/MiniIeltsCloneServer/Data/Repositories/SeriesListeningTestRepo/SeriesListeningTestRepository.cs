using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.SeriesListeningTestRepo
{
    public class SeriesListeningTestRepository : GenericRepository<SeriesListeningTest>, ISeriesListeningTestRepository
    {
        public SeriesListeningTestRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}