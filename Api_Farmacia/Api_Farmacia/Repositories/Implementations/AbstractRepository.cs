using Api_Farmacia.Data;
using Api_Farmacia.Data.Models;
using Api_Farmacia.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api_Farmacia.Repositories.Implementations
{
    public abstract class AbstractRepository<T> : IRepository<T> where T : Identificable
    {
        protected readonly FarmaciaContext _context;

        protected AbstractRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public async Task<List<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }
        virtual public async Task<T?> GetById(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }
        public async Task<T?> Create(T entidad)
        {
            await _context.Set<T>().AddAsync(entidad);
            await _context.SaveChangesAsync();
            return await GetById(entidad.Id);
        }
        public virtual async Task<bool> Delete(int id)
        {
            T? entidad = await GetById(id);
            if (entidad is not null)
            {
                _context.Set<T>().Remove(entidad);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public abstract Task<T?> Update(T entidad);
    }
}
