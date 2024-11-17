using Api_Farmacia.Data.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAll();

        Task<T?> GetById(int id);

        Task<T?> Create(T entidad);

        Task<T?> Update(T entidad);

        Task<bool> Delete(int id);
    }
}
