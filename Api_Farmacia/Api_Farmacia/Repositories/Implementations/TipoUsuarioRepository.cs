using Api_Farmacia.Data;
using Api_Farmacia.Data.Models;

namespace Api_Farmacia.Repositories.Implementations
{
    public class TipoUsuarioRepository : AbstractRepository<TipoUsuario>
    {
        public TipoUsuarioRepository(FarmaciaContext context) : base(context)
        {
        }

        public override async Task<TipoUsuario?> Update(TipoUsuario entidad)
        {
            TipoUsuario? tipoUsuarioExistente = await GetById(entidad.Id);
            if (tipoUsuarioExistente is not null)
            {
                tipoUsuarioExistente.Nombre = entidad.Nombre;
                tipoUsuarioExistente.Descripcion = entidad.Descripcion;

                await _context.SaveChangesAsync();
            }
            //si existe devuelve la entidad, sino null
            return await GetById(entidad.Id);
        }
    }
}
