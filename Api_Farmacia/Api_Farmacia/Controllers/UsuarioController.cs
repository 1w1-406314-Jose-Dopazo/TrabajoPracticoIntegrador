using Api_Farmacia.Models;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
    public class UsuarioController : Controller
    {
        IUsuarioService _service;

        public UsuarioController(IUsuarioService service)
        {
            _service = service;
        }


        [HttpGet("Usuarios")]
        public IActionResult GetUsuarios()
        {
            return Ok(_service.UsuarioGetAll());
        }

        [HttpGet("Usuarios/{id}")]
        public IActionResult GetUsuarioById(int id)
        {
            return Ok(_service.UsuarioGetById(id));
        }

        [HttpDelete("Usuarios/{id}")]
        public IActionResult DeleteUsuario(int id)
        {
            return Ok(_service.UsuarioDelete(id));
        }

        [HttpPost("Usuarios")]
        public IActionResult NewUsuario(string nombre,string contraseña,TipoUsuario tipoUsuario)
        {
            
            Usuario usuario = new Usuario() { Alias=nombre,Contraseña=contraseña};
            
            return Ok(_service.UsuarioCreate(usuario,tipoUsuario));
        }

        [HttpPatch("Usuarios")]
        public IActionResult UpdateUsuario(int id,string nombre,string contraseña,TipoUsuario tipoUsuario)
        {
            Usuario usuario = new Usuario() {Id=id,Alias=nombre,Contraseña=contraseña,IdTipoUsuario=tipoUsuario.Id };
            return Ok(_service.UsuarioUpdate(usuario));
        }
    }
}
