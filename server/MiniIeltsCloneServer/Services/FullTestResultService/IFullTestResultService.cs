using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;

namespace MiniIeltsCloneServer.Services.FullTestResultService
{
    public interface IFullTestResultService
    {
        Task<FullTestResult?> GetFullTestResultById(int fullTestResultId);
    }
}