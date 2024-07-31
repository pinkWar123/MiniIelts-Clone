using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Wrappers.Filter;

namespace MiniIeltsCloneServer.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        public GenericRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }
        public DbSet<T> GetContext()
        {
            return _context.Set<T>();
        }
        public async Task AddAsync(T entity)
        {
            await GetContext().AddAsync(entity);
        }

        public async Task AddRangeAsync(List<T> entities)
        {
            await GetContext().AddRangeAsync(entities);
        }

        public async Task<List<T>?> FindAllAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();

        }

        virtual public async Task<T?> GetByIdAsync(int id)
        {
            return await GetContext().FindAsync(id);
        }
        public virtual IQueryable<T>? GetValuesByQuery(QueryObject queryObject)
        {
            var items = _context.Set<T>().AsQueryable();
            foreach (var property in queryObject.GetType().GetProperties())
            {
                var value = property.GetValue(queryObject);

                // Apply sorting
                if (!string.IsNullOrEmpty(queryObject.SortBy))
                {
                    var sortByFields = queryObject.SortBy.Split(',');
                    var IsDescending = queryObject.IsDescending;

                    IOrderedQueryable<T> orderedItems = null;

                    for (int i = 0; i < sortByFields.Length; i++)
                    {
                        var field = sortByFields[i];
                        var sortByProperty = typeof(T).GetProperty(field);

                        if (sortByProperty == null) continue;

                        if (i == 0)
                        {
                            orderedItems = IsDescending
                            ? items.OrderByDescending(e => EF.Property<object>(e, field))
                            : items.OrderBy(e => EF.Property<object>(e, field));
                        }
                        else
                        {
                            orderedItems = IsDescending
                            ? orderedItems.ThenByDescending(e => EF.Property<object>(e, field))
                            : orderedItems.ThenBy(e => EF.Property<object>(e, field));
                        }

                    }

                    if (orderedItems != null)
                        items = orderedItems;
                }

                // Apply filterting

                if (value != null
                && value is string stringValue
                && !QueryObject.GetFilterExcludes().Contains(property.Name))
                {
                    items = items.Where(CreateWhereExpression<T>(property.Name, stringValue));
                }


            }
            var validPagination = new PaginationFilter(queryObject.PageNumber, queryObject.PageSize);
            var skipNumber = (validPagination.PageNumber - 1) * validPagination.PageSize;
            return items.Skip(skipNumber).Take(validPagination.PageSize);
        }
        public async Task<List<T>?> GetValuesAsync(QueryObject queryObject)
        {
            var items = GetValuesByQuery(queryObject);
            if (items == null) return [];
            return await items.ToListAsync();
        }

        public async Task<bool> IsExisted(int Id)
        {
            return await GetContext().FindAsync(Id) != null;
        }

        public void Remove(T entity)
        {
            GetContext().Remove(entity);
        }

        public void RemoveRange(List<T> entities)
        {
            GetContext().RemoveRange(entities);
        }

        public async Task<T?> UpdateAsync<TUpdateDto>(int id, TUpdateDto entity) where TUpdateDto : class
        {
            var existingEntity = await GetByIdAsync(id);
            if (existingEntity == null)
                return null;
            var updateDtoProperties = typeof(TUpdateDto).GetProperties();
            var entityProperties = typeof(T).GetProperties().Select(p => p.Name).ToHashSet();

            // Ensure all properties in updateDto exist in the entity class
            foreach (var property in updateDtoProperties)
            {
                if (!entityProperties.Contains(property.Name))
                {
                    throw new Exception($"Property {property.Name} does not exist in the entity class.");
                }
            }
            foreach (var property in typeof(T).GetProperties())
            {
                var newValue = property.GetValue(entity);
                var existingProperty = typeof(T).GetProperty(property.Name);
                if (existingProperty != null && existingProperty.CanWrite)
                {
                    existingProperty.SetValue(existingEntity, newValue);
                }
            }
            return existingEntity;
        }
        private static Expression<Func<T, bool>> CreateWhereExpression<T>(string propertyName, string propertyValue)
        {
            var parameter = Expression.Parameter(typeof(T), "s");
            var property = Expression.Property(parameter, propertyName);
            var method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            var value = Expression.Constant(propertyValue, typeof(string));
            var containsMethodExp = Expression.Call(property, method, value);

            return Expression.Lambda<Func<T, bool>>(containsMethodExp, parameter);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
