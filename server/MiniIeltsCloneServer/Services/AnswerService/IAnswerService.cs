using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Answer;

namespace MiniIeltsCloneServer.Services.AnswerService
{
    public interface IAnswerService
    {
        Task CreateNewAnswer(CreateAnswerDto createAnswerDto);
    }
}