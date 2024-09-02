using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Test> TestRepository { get; }
        IGenericRepository<Excercise> ExerciseRepository { get; }
        IGenericRepository<Question> QuestionRepository { get; }
        IGenericRepository<ExerciseChoice> ExerciseChoiceRepository { get; }
        IGenericRepository<QuestionChoice> QuestionChoiceRepository { get; }
        IGenericRepository<Result> ResultRepository { get; }
        IGenericRepository<Answer> AnswerRepository { get; }
        Task<int> SaveChangesAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
