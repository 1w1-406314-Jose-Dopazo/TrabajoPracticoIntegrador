using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface ITipoUsuarioService
    {
        List<TipoUsuario> TipoUsuarioGetAll();

        TipoUsuario TipoUsuarioGetById(int id);

        bool TipoUsuarioUpdate(TipoUsuario tipoUsuario);

        bool TipoUsuarioDelete(int id);

        bool TipoUsuarioCreate(TipoUsuario tipoUsuario);
    }
}
