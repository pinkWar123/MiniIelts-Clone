using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using MiniIeltsCloneServer.Data.Repositories.ExerciseChoiceRepo;
using MiniIeltsCloneServer.Data.Repositories.ExerciseRepository;
using MiniIeltsCloneServer.Data.Repositories.QuestionChoiceRepo;
using MiniIeltsCloneServer.Data.Repositories.QuestionRepo;
using MiniIeltsCloneServer.Data.Repositories.TestRepo;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;

namespace MiniIeltsCloneServer.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IDbContextTransaction _transaction;
        private ITestRepository _testRepo;
        private IExerciseRepository _exerciseRepo;
        private IQuestionRepository _questionRepo;
        private IExerciseChoiceRepository _exerciseChoiceRepo;
        private IQuestionChoiceRepository _questionChoiceRepo;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<Test> TestRepository
        => _testRepo ??= new TestRepository(_context);

        public IGenericRepository<Excercise> ExerciseRepository
        => _exerciseRepo ??= new ExerciseRepository(_context);

        public IGenericRepository<Question> QuestionRepository
        => _questionRepo ??= new QuestionRepository(_context);

        public IGenericRepository<ExerciseChoice> ExerciseChoiceRepository
        => _exerciseChoiceRepo ??= new ExerciseChoiceRepository(_context);

        public IGenericRepository<QuestionChoice> QuestionChoiceRepository
        => _questionChoiceRepo ??= new QuestionChoiceRepository(_context);

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
            await _context.SaveChangesAsync();
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
