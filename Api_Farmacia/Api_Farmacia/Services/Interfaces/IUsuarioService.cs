using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IUsuarioService
    {
        List<Usuario> UsuarioGetAll();

        Usuario UsuarioGetById(int id);

        bool UsuarioUpdate(Usuario usuario);

        bool UsuarioDelete(int id);

        bool UsuarioCreate(Usuario usuario, TipoUsuario tipoUsuario);
    }
}
