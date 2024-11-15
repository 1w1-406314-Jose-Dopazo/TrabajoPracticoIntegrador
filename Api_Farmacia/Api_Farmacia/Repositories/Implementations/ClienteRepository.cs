using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;

namespace Api_Farmacia.Repositories.Implementations
{
    public class ClienteRepository : IClienteRepository
    {
        private FarmaciaContext _context;

        public ClienteRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public List<Cliente> GetAll()
        {
            try
            {
                return _context.Clientes.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                Cliente? cliente = GetById(id);
                if (cliente == null)
                {
                    return false;
                }
                _context.Clientes.Remove(cliente);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Cliente? Create(Cliente cliente)
        {
            try
            {
                _context.Clientes.Add(cliente);
                _context.SaveChanges();
                return cliente;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Cliente? GetById(int id)
        {
            try
            {
                return _context.Clientes.Find(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Cliente? Update(Cliente cliente)
        {
            try
            {
                Cliente? clienteDb = GetById(cliente.Id);
                if (clienteDb == null)
                {
                    return null;
                }
                clienteDb.Nombre = cliente.Nombre;
                clienteDb.Apellido = cliente.Apellido;
                clienteDb.Telefono = cliente.Telefono;
                _context.SaveChanges();
                return clienteDb;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
