using Api_Farmacia.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface ITipoUsuarioRepository
    {
        List<TipoUsuario> GetAll();

        TipoUsuario GetById(int id);

        bool Update(TipoUsuario tipoUsuario);

        bool Delete(int id);

        bool Create(TipoUsuario tipoUsuario);

    }
}
