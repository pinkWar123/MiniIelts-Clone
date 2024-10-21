using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Dtos.Test;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.TestService;
using MiniIeltsCloneServer.Wrappers;

namespace MiniIeltsCloneServer.Data.Repositories.TestRepo
{
    public class TestRepository : GenericRepository<Test>, ITestRepository
    {
        public TestRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            
        }

        public async Task<int> CountAsync(Expression<Func<Test, bool>>? predicate)
        {
            if(predicate != null)
                return await GetContext().CountAsync(predicate);
            else return await GetContext().CountAsync();
        }

        public override async Task<Test?> GetByIdAsync(int id)
        {
            var test = await GetContext().AsSplitQuery()
            .Include(x => x.Excercises)
                    .ThenInclude(x => x.ChooseManyChoices)
                .Include(x => x.Excercises)
                    .ThenInclude(x => x.Questions)
                        .ThenInclude(x => x.Choices).FirstOrDefaultAsync(x => x.Id == id);
            return test;
        }

        public async Task<List<TestDropdownViewDto>> GetTestDropdownViewDtos(string testName)
        {
            return await GetContext()
                        .Where(t => t.Title.ToLower().Contains(testName.ToLower()))
                        .Select(t => new TestDropdownViewDto
                        {
                            Title = t.Title,
                            Id = t.Id
                        })
                        .Take(10)
                        .ToListAsync();
        }

        public async Task<PagedData<Test>> GetTestSearchViews(TestQueryObject @object)
        {
            var query = GetContext()
                            .Include(x => x.Excercises)
                            .AsQueryable();

            if(@object?.Title != null && !String.IsNullOrEmpty(@object.Title))
            {
                query = query.Where(q => q.Title.ToLower().Contains(@object.Title.ToLower()));
            }
            
            if(@object?.QuestionType != null && @object.QuestionType.Count > 0)
            {
                query = query.Where(q => q.Excercises
                                .Any(e => @object.QuestionType.Contains(e.ExerciseType)));
            }

            if(@object?.QuestionSort != null)
            {
                switch (@object.QuestionSort)
                {
                    case Constants.QuestionSortEnum.Newest:
                        query = query.OrderByDescending(q => q.CreatedOn);
                        break;
                    case Constants.QuestionSortEnum.Oldest:
                        query = query.OrderBy(q => q.CreatedOn);
                        break;
                    case Constants.QuestionSortEnum.NameAZ:
                        query = query.OrderBy(q => q.Title);
                        break;
                    case Constants.QuestionSortEnum.NameZA:
                        query = query.OrderByDescending(q => q.Title);
                        break;
                    case Constants.QuestionSortEnum.MostViewed:
                        query = query.OrderByDescending(q => q.ViewCount);
                        break;
                }
            }

            var totalRecords = await query.CountAsync();
            query = query.Skip((@object.PageNumber - 1) * @object.PageSize).Take(@object.PageSize);
            var tests = await query.ToListAsync();

            return new PagedData<Test>
            {
                TotalRecords = totalRecords,
                Value = tests
            };
        }

        public async Task<Test?> GetTestWithExplanations(int testId)
        {
            // Step 1: Fetch the Test and its related Exercises
            var test = await GetContext().AsSplitQuery()
                    .Include(x => x.Excercises)
                            .ThenInclude(x => x.ChooseManyChoices)
                        .Include(x => x.Excercises)
                            .ThenInclude(x => x.Questions)
                                .ThenInclude(x => x.Choices)
                    .Include(x => x.Excercises)
                        .ThenInclude(e => e.Questions)
                            .ThenInclude(q => q.Explanation)
                    .FirstOrDefaultAsync(x => x.Id == testId);
                    return test;
        }
    }
}
