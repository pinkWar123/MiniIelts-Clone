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
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IDbContextTransaction _transaction;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            TestRepository = new TestRepository(_context);
            ExerciseRepository = new ExerciseRepository(_context);
            QuestionRepository = new QuestionRepository(_context);
            ExerciseChoiceRepository = new ExerciseChoiceRepository(_context);
            QuestionChoiceRepository = new QuestionChoiceRepository(_context);
            ResultRepository = new ResultRepository(_context);
            AnswerRepository = new AnswerRepository(_context);
            FullTestRepository = new FullTestRepository(_context);
            FullTestResultRepository = new FullTestResultRepository(_context);
            SeriesRepository = new SeriesRepository(_context);
            SeriesFullTestRepository = new SeriesFullTestRepository(_context);
            PostRepository = new PostRepository(_context);
            ExplanationRepository = new ExplanationRepository(_context);
            ListeningTestRepository = new ListeningTestRepository(_context);
            SeriesListeningTestRepository = new SeriesListeningTestRepository(_context);
            ListeningResultRepository = new ListeningResultRepository(_context);
        }

        public ITestRepository TestRepository { get; private set; }
        public IExerciseRepository ExerciseRepository {get; private set; }

        public IQuestionRepository QuestionRepository { get; private set;}

        public IExerciseChoiceRepository ExerciseChoiceRepository { get; private set;}

        public IQuestionChoiceRepository QuestionChoiceRepository { get; private set;}

        public IResultRepository ResultRepository { get; private set;}

        public IAnswerRepository AnswerRepository { get; private set;}

        public IStatisticRepository StatisticRepository { get; private set; }
        public IFullTestRepository FullTestRepository { get; private set; }
        public IFullTestResultRepository FullTestResultRepository { get; private set; }
        public ISeriesRepository SeriesRepository { get; private set; }
        public ISeriesFullTestRepository SeriesFullTestRepository { get; private set; }
        public IPostRepository PostRepository { get; private set; }

        public IExplanationRepository ExplanationRepository { get; private set; }

        public IListeningTestRepository ListeningTestRepository { get; private set; }

        public ISeriesListeningTestRepository SeriesListeningTestRepository { get; private set; }

        public IListeningResultRepository ListeningResultRepository { get; private set; }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            if (_transaction == null)
            {
                _transaction = await _context.Database.BeginTransactionAsync();
            }
            return _transaction;
        }

        public async Task CommitAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync(); // Dispose of the transaction after committing
                _transaction = null;
            }
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync(); // Dispose of the transaction after rolling back
                _transaction = null;
            }
        }
    }
}
