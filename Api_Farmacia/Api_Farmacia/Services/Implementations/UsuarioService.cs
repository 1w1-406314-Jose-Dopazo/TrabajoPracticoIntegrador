using Api_Farmacia.Controllers.DTO_s.Usuario;
using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class UsuarioService : IUsuarioService
    {

        private IUsuarioRepository _Usuario_Repository;
        private ITipoUsuarioRepository _TipoUsuarioRepository;

        public UsuarioService(IUsuarioRepository ur, ITipoUsuarioRepository tipoUsuarioRepository)
        {
            _Usuario_Repository = ur;
            _TipoUsuarioRepository = tipoUsuarioRepository;
        }

        public bool UsuarioCreate(UsuarioPostDto usuarioDto)
        {
            try
            {
                TipoUsuario tipoUsuario = _TipoUsuarioRepository.GetById(usuarioDto.IdTipoUsuario);
                Usuario usuario = new Usuario()
                {
                    Nombre= usuarioDto.Nombre,
                    Contraseña = usuarioDto.Contraseña,
                    IdTipoUsuario = usuarioDto.IdTipoUsuario

                };
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

        public List<UsuarioPatchGetDto> UsuarioGetAll()
        {
            List<Usuario>lstUsuarios = _Usuario_Repository.GetAll();
            List<UsuarioPatchGetDto> lstDtos = new List<UsuarioPatchGetDto>();
            foreach(Usuario usuario in lstUsuarios)
            {
                UsuarioPatchGetDto dto = new UsuarioPatchGetDto()
                {
                    Id = usuario.Id,
                    Nombre = usuario.Nombre,
                    Contraseña = usuario.Contraseña,
                    IdTipoUsuario = usuario.IdTipoUsuario
                };
                lstDtos.Add(dto);
            }
            return lstDtos;
        }

        public Usuario UsuarioGetById(int id)
        {
            return _Usuario_Repository.GetById(id);
        }

        public Usuario UsuarioGetOne(string nombre)
        {
            return _Usuario_Repository.GetOne(nombre);
        }

        public bool UsuarioUpdate(UsuarioPatchGetDto usuarioDto)
        {
            try
            {
                Usuario usuario = new Usuario()
                {
                    Id = usuarioDto.Id,
                    Nombre = usuarioDto.Nombre,
                    Contraseña = usuarioDto.Contraseña,
                    IdTipoUsuario = usuarioDto.IdTipoUsuario

                };
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
