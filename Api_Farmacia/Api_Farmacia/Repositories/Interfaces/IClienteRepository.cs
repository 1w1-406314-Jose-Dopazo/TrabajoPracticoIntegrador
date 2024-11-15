using Api_Farmacia.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface IClienteRepository
    {
        List<Cliente> GetAll();

        bool Delete(int id);

        Cliente? GetById(int id);

        Cliente? Update(Cliente cliente);

        Cliente? Create(Cliente cliente);
    }
}
