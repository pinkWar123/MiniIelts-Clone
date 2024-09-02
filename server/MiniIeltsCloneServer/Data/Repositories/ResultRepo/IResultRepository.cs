using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Result;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.ResultRepo
{
    public interface IResultRepository: IGenericRepository<Result>
    {
    }
}