using Api_Farmacia.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuario> GetAll();

        Usuario GetById(int id);


        Usuario GetOne(string nombre);

        bool Update(Usuario usuario);

        bool Delete(int id);

        bool Create(Usuario usuario, TipoUsuario tipoUsuario);
    }
}
