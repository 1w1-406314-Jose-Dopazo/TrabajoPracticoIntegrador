using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class TipoUsuarioService:ITipoUsuarioService
    {

        ITipoUsuarioRepository _Tipo_Usuario_Repository;

        public TipoUsuarioService(ITipoUsuarioRepository tur)
        {

            _Tipo_Usuario_Repository = tur;
        }

        public bool TipoUsuarioCreate(TipoUsuario tipoUsuario)
        {
            try
            {
                _Tipo_Usuario_Repository.Create(tipoUsuario);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool TipoUsuarioDelete(int id)
        {
            try
            {
                _Tipo_Usuario_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<TipoUsuario> TipoUsuarioGetAll()
        {
            return _Tipo_Usuario_Repository.GetAll();
        }

        public TipoUsuario TipoUsuarioGetById(int id)
        {
            return _Tipo_Usuario_Repository.GetById(id);
        }

        public bool TipoUsuarioUpdate(TipoUsuario tipoUsuario)
        {
            try
            {
                _Tipo_Usuario_Repository.Update(tipoUsuario);
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
