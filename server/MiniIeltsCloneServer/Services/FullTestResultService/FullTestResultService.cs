using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.FullTest;

namespace MiniIeltsCloneServer.Services.FullTestResultService
{
    public class FullTestResultService : IFullTestResultService
    {
        private readonly IUnitOfWork _unitOfWork;
        public FullTestResultService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<FullTestResult?> GetFullTestResultById(int fullTestResultId)
        {
            var fullTestResult = await _unitOfWork.FullTestResultRepository.GetByIdAsync(fullTestResultId);
            return fullTestResult;
        }
    }
}