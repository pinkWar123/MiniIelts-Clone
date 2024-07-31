using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.Question;

namespace MiniIeltsCloneServer.Services.QuestionService
{
    public interface IQuestionService
    {
        Task CreateNewQuestionAsync(CreateQuestionDto createQuestionDto, int exerciseId);
        Task<List<QuestionViewDto>?> GetAllQuestions(QuestionQueryObject queryObject);
    }
}
