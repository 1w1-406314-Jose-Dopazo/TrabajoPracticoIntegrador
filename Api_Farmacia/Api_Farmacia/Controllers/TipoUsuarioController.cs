using Api_Farmacia.Models;
using Api_Farmacia.Services;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace Api_Farmacia.Controllers
{
    public class TipoUsuarioController : Controller
    {
        // GET: TipoUsuarioController
        ITipoUsuarioService _service;

        public TipoUsuarioController(ITipoUsuarioService service)
        {
            _service = service;
        }


        [HttpGet("Tipos_Usuarios")]
        public IActionResult GetTiposUsuarios()
        {
            return Ok(_service.TipoUsuarioGetAll());
        }

        [HttpGet("Tipos_Usuarios/{id}")]
        public IActionResult GetTipoUsuarioById(int id)
        {
            return Ok(_service.TipoUsuarioGetById(id));
        }

        [HttpDelete("Tipos_Usuarios/{id}")]
        public IActionResult DeleteTipoUsuario(int id) 
        {
            return Ok(_service.TipoUsuarioDelete(id));
        }

        [HttpPost("Tipos_Usuarios")]
        public IActionResult NewTipoUsuario(string descripcion) 
        {
            TipoUsuario tipoUsuario = new TipoUsuario();
            tipoUsuario.Descripcion = descripcion;
            return Ok(_service.TipoUsuarioCreate(tipoUsuario));
        }

        [HttpPatch("Tipos_Usuarios")]
        public IActionResult UpdateTipoUsuario(int id,string descripcion)
        {
            TipoUsuario tipoUsuario=new TipoUsuario() { Id=id,Descripcion=descripcion};
            return Ok(_service.TipoUsuarioUpdate(tipoUsuario));
        }
    }
}
