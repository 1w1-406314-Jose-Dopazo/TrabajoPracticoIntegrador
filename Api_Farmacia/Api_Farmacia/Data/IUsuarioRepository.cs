using Api_Farmacia.Models;

namespace Api_Farmacia.Data
{
    public interface IUsuarioRepository
    {
        List<Usuario> GetAll();

        Usuario GetById(int id);

        bool Update(Usuario usuario);

        bool Delete(int id);

        bool AddOne(Usuario usuario,TipoUsuario tipoUsuario);
    }
}
