using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models.Dtos.QuestionChoice;

namespace MiniIeltsCloneServer.Services.QuestionChoiceService
{
    public interface IQuestionChoiceService
    {
        Task CreateQuestionChoiceAsync(CreateQuestionChoiceDto createQuestionChoiceDto);
        Task<List<QuestionChoiceViewDto>?> GetAllQuestionChoicesAsync(QuestionChoiceQueryObject questionChoiceQueryObject);
    }
}
