using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MiniIeltsCloneServer.Helpers;

namespace MiniIeltsCloneServer.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<List<T>?> GetValuesAsync(QueryObject queryObject);
        IQueryable<T>? GetValuesByQuery(QueryObject queryObject);
        Task<List<T>?> FindAllAsync(Expression<Func<T, bool>> predicate);
        Task AddAsync(T entity);
        Task AddRangeAsync(List<T> entities);
        public Task<T?> UpdateAsync<TUpdateDto>(int id, TUpdateDto entity) where TUpdateDto : class;
        void Remove(T entity);
        void RemoveRange(List<T> entities);
        public Task<bool> IsExisted(int Id);
    }
}
