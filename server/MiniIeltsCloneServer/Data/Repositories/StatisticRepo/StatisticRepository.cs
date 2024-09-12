using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models.Dtos.Statistic;

namespace MiniIeltsCloneServer.Data.Repositories.StatisticRepo
{
    public class StatisticRepository : IStatisticRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        public StatisticRepository(IUnitOfWork unitOfWork, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        public async Task<Accuracy> GetQuestionAccuracies()
        {
            var accuracies = await _context.Answers
                                .GroupBy(a => a.QuestionType)
                                .Select(g => new QuestionAccuracy
                                {
                                    QuestionType = g.Key,
                                    Accuracy = (double) g.Count(a => a.IsCorrect) / g.Count()
                                })
                                .ToListAsync();
            return new Accuracy
            {
                QuestionAccuracies = accuracies
            };
        }

        public async Task<QuestionDistribution> GetQuestionDistribution()
        {
            var distributions = await _context.Questions
                                    .GroupBy(q => q.QuestionType)
                                    .Select(g => new 
                                    {
                                        QuestionType = g.Key,
                                        TotalQuestions = g.Count()
                                    })
                                    .ToListAsync();
            var totalQuestion = await _context.Questions.CountAsync();

            return new QuestionDistribution
            {
                QuestionDistributionDetails = distributions.Select(d => new QuestionDistributionDetail
                {
                    QuestionType = d.QuestionType,
                    Distribution = (double) d.TotalQuestions / totalQuestion
                }).ToList()
            };
        }

        public async Task<ScoreDistribution> GetScoreDistribution()
        {
            var distributionDetails = await _context.Results
                        .GroupBy(r => Math.Floor(r.Score))
                        .Select(g => new ScoreDistributionDetail
                        {
                            FloorScore = g.Key,
                            Number = g.Count()
                        })
                        .ToListAsync();

            return new ScoreDistribution
            {
                ScoreDistributionDetails = distributionDetails
            };
        }

        public async Task<TopStatistics> GetTopStatistics()
        {
            var topTests = await _context.Tests
                            .OrderByDescending(t => t.ViewCount)
                            .Take(5)
                            .Select(t => new TopTest
                            {
                                Title = t.Title,
                                CreatedOn = t.CreatedOn,
                                ViewCount = t.ViewCount
                            })
                            .ToListAsync();
            
            var topUsers = await _context.Users
                            .Join(_context.Results, 
                                u => u.Id, 
                                r => r.AppUserId, 
                                (u, r) => new {u, r})
                            .GroupBy(model => model.u.Id)
                            .Select(g => new
                            {
                                User = g.FirstOrDefault().u,
                                ResultCount = g.Count()
                            })
                            .OrderByDescending(x => x.ResultCount)
                            .ToListAsync();
            
            

            return new TopStatistics
            {
                TopTests = topTests.Select(t => new TopTest
                {
                    Title = t.Title,
                    ViewCount = t.ViewCount,
                    CreatedOn = t.CreatedOn
                }).ToList(),

                TopUsers = topUsers.Select(t => new TopUser
                {
                    UserName = t.User.UserName,
                    Email = t.User.Email,
                    TotalTestTakenTimes = t.ResultCount
                }).ToList()
            };
        }

        public async Task<TotalStatistics> GetTotalStatistics()
        {
            var totalUsers = await _context.Users.CountAsync();
            
            var result = await _context.Tests
                            .GroupBy(t => 1)
                            .Select(g => new 
                            {
                                TotalTests = g.Count(),
                                TotalViews = g.Sum(t => t.ViewCount)
                            })
                            .FirstOrDefaultAsync();
            
            return new TotalStatistics
            {
                TotalUsers = totalUsers,
                TotalTests = result?.TotalTests ?? 0,
                TotalTestTakenTimes = result?.TotalViews ?? 0
            };
        }
    }
}