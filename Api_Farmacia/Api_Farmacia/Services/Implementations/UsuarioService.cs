using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class UsuarioService : IUsuarioService
    {

        IUsuarioRepository _Usuario_Repository;

        public UsuarioService(IUsuarioRepository ur)
        {
            _Usuario_Repository = ur;
        }

        public bool UsuarioCreate(Usuario usuario, TipoUsuario tipoUsuario)
        {
            try
            {
                _Usuario_Repository.Create(usuario, tipoUsuario);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool UsuarioDelete(int id)
        {
            try
            {
                _Usuario_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<Usuario> UsuarioGetAll()
        {
            return _Usuario_Repository.GetAll();
        }

        public Usuario UsuarioGetById(int id)
        {
            return _Usuario_Repository.GetById(id);
        }

        public bool UsuarioUpdate(Usuario usuario)
        {
            try
            {
                _Usuario_Repository.Update(usuario);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
