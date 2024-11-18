using Api_Farmacia.Data.Models;
using Api_Farmacia.Data;
using Api_Farmacia.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api_Farmacia.Repositories.Implementations
{
    public class ClienteRepository : AbstractRepository<Cliente>
    {
        public ClienteRepository(FarmaciaContext context) : base(context)
        {
        }

        public override async Task<Cliente?> Update(Cliente cliente)
        {
            Cliente? clienteExistente = await GetById(cliente.Id);
            if (clienteExistente is not null)
            {
                clienteExistente.Nombre = cliente.Nombre;
                clienteExistente.Apellido = cliente.Apellido;
                clienteExistente.Telefono = cliente.Telefono;

                await _context.SaveChangesAsync();
            }
            //si existe devuelve cliente, sino null
            return await GetById(cliente.Id);
        }
    }
}
