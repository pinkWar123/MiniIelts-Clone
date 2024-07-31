using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data.Repositories.QuestionChoiceRepo
{
    public class QuestionChoiceRepository : GenericRepository<QuestionChoice>, IQuestionChoiceRepository
    {
        public QuestionChoiceRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}
