﻿using Api_Farmacia.Models;
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
        public IActionResult GetUsuarios()
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
        public IActionResult NewUsuario(string nombre,string contraseña,TipoUsuario tipoUsuario)
        {
            
            Usuario usuario = new Usuario() { Nombre=nombre,Contraseña=contraseña};
            
            return Ok(_service.UsuarioCreate(usuario,tipoUsuario));
        }

        [HttpPatch("Usuarios")]
        public IActionResult UpdateUsuario(int id,string nombre,string contraseña,TipoUsuario tipoUsuario)
        {
            Usuario usuario = new Usuario() {Id=id,Nombre=nombre,Contraseña=contraseña,IdTipoUsuario=tipoUsuario.Id };
            return Ok(_service.UsuarioUpdate(usuario));
        }
    }
}
