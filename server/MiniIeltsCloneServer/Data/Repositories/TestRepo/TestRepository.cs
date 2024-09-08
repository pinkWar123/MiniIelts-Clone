using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Models;
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

        public override async Task<Test?> GetByIdAsync(int id)
        {
            var test = await GetContext().AsQueryable()
            .Include(x => x.Excercises)
                    .ThenInclude(x => x.ChooseManyChoices)
                .Include(x => x.Excercises)
                    .ThenInclude(x => x.Questions)
                        .ThenInclude(x => x.Choices).FirstOrDefaultAsync(x => x.Id == id);
            return test;
        }

        public async Task<PagedData<Test>> GetTestSearchViews(TestQueryObject @object)
        {
            Console.WriteLine(@object?.QuestionType?.Count());
            var query = GetContext()
                            .Include(x => x.Excercises)
                            .AsQueryable();
            
            if(@object.QuestionType != null && @object.QuestionType.Count > 0)
            {
                query = query.Where(q => q.Excercises
                                .Any(e => @object.QuestionType.Contains(e.ExerciseType)));
            }

            if(@object.QuestionSort != null)
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

            throw new NotImplementedException();
        }
    }
}
