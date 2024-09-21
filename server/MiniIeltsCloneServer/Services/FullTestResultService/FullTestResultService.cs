using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Data;

namespace MiniIeltsCloneServer.Services.FullTestResultService
{
    public class FullTestResultService : IFullTestResultService
    {
        private readonly IUnitOfWork _unitOfWork;
        public FullTestResultService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}