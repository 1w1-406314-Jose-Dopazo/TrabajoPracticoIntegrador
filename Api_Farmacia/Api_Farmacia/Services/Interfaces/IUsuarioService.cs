using Api_Farmacia.Controllers.DTO_s.Usuario;
using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IUsuarioService
    {
        List<UsuarioPatchGetDto> UsuarioGetAll();


        Usuario UsuarioGetOne(string nombre);
        Usuario UsuarioGetById(int id);

        bool UsuarioUpdate(UsuarioPatchGetDto usuario);

        bool UsuarioDelete(int id);

        bool UsuarioCreate(UsuarioPostDto usuario);
    }
}
