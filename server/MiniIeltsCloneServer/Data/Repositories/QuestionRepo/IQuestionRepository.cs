using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.QuestionRepo
{
    public interface IQuestionRepository : IGenericRepository<Question>
    {
        Task<Question?> GetQuestionWithExplanation(int questionId);
    }
}
