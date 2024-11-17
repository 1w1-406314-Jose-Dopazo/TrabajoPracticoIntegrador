using Api_Farmacia.Controllers.DTO_s.Factura;
using Api_Farmacia.Controllers.DTO_s.Usuario;
using Api_Farmacia.Models;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
    public class UsuarioController : Controller
    {
       private IUsuarioService _service;

        public UsuarioController(IUsuarioService service)
        {
            _service = service;
        }


        [HttpGet("Usuarios")]
        public ActionResult<UsuarioPatchGetDto> GetUsuarios()
        {
            return Ok(_service.UsuarioGetAll());
        }

        [HttpGet("Usuarios/{id}")]
        public IActionResult GetUsuarioById(int id)
        {
            return Ok(_service.UsuarioGetById(id));
        }


        [HttpGet("Usuarios/getone/{nombre}")]
        public IActionResult GetUsuarioByName(string nombre)
        {
            return Ok(_service.UsuarioGetOne(nombre));
        }

        [HttpDelete("Usuarios/{id}")]
        public IActionResult DeleteUsuario(int id)
        {
            return Ok(_service.UsuarioDelete(id));
        }

        [HttpPost("Usuarios")]
        public ActionResult NewUsuario([FromBody] UsuarioPostDto usuario)
        {

            try
            {
                return Created(string.Empty, _service.UsuarioCreate(usuario));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPatch("Usuarios")]
        public ActionResult UpdateUsuario([FromBody]UsuarioPatchGetDto usuario)
        {
            
            return Ok(_service.UsuarioUpdate(usuario));
        }
    }
}
