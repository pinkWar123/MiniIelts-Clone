using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using MiniIeltsCloneServer.Data.Repositories.AnswerRepo;
using MiniIeltsCloneServer.Data.Repositories.ExerciseChoiceRepo;
using MiniIeltsCloneServer.Data.Repositories.ExerciseRepository;
using MiniIeltsCloneServer.Data.Repositories.ExplanationRepo;
using MiniIeltsCloneServer.Data.Repositories.FullTestRepo;
using MiniIeltsCloneServer.Data.Repositories.FullTestResultRepo;
using MiniIeltsCloneServer.Data.Repositories.ListeningResultRepo;
using MiniIeltsCloneServer.Data.Repositories.ListeningTestRepo;
using MiniIeltsCloneServer.Data.Repositories.PostRepo;
using MiniIeltsCloneServer.Data.Repositories.QuestionChoiceRepo;
using MiniIeltsCloneServer.Data.Repositories.QuestionRepo;
using MiniIeltsCloneServer.Data.Repositories.ResultRepo;
using MiniIeltsCloneServer.Data.Repositories.SeriesFullTestRepo;
using MiniIeltsCloneServer.Data.Repositories.SeriesListeningTestRepo;
using MiniIeltsCloneServer.Data.Repositories.SeriesRepo;
using MiniIeltsCloneServer.Data.Repositories.StatisticRepo;
using MiniIeltsCloneServer.Data.Repositories.TestRepo;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data
{
    public interface IUnitOfWork : IDisposable
    {
        ITestRepository TestRepository { get; }
        IExerciseRepository ExerciseRepository { get; }
        IQuestionRepository QuestionRepository { get; }
        IExerciseChoiceRepository ExerciseChoiceRepository { get; }
        IQuestionChoiceRepository QuestionChoiceRepository { get; }
        IResultRepository ResultRepository { get; }
        IAnswerRepository AnswerRepository { get; }
        IStatisticRepository StatisticRepository { get; }
        IFullTestRepository FullTestRepository{ get; }
        IFullTestResultRepository FullTestResultRepository { get; }
        ISeriesFullTestRepository SeriesFullTestRepository { get; }
        ISeriesRepository SeriesRepository { get; }
        IPostRepository PostRepository { get; }
        IExplanationRepository ExplanationRepository { get; }        
        IListeningTestRepository ListeningTestRepository { get; }
        ISeriesListeningTestRepository SeriesListeningTestRepository { get; }
        IListeningResultRepository ListeningResultRepository { get; }
        Task<int> SaveChangesAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
