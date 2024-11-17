using Api_Farmacia.Data;
using Api_Farmacia.Data.Models;

namespace Api_Farmacia.Repositories.Implementations
{
    public class UsuarioRepository : AbstractRepository<Usuario>
    {
        public UsuarioRepository(FarmaciaContext context) : base(context)
        {
        }

        public async override Task<Usuario?> Update(Usuario entidad)
        {
            Usuario? usuarioExistente = await GetById(entidad.Id);
            if (usuarioExistente is not null)
            {
                usuarioExistente.Nombre = entidad.Nombre;
                usuarioExistente.Contraseña = entidad.Contraseña;
                usuarioExistente.IdTipoUsuario = entidad.IdTipoUsuario;

                await _context.SaveChangesAsync();
            }
            //si existe devuelve la entidad, sino null
            return await GetById(entidad.Id);
        }
    }
}
