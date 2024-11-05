﻿using Api_Farmacia.Models;
using Api_Farmacia.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace Api_Farmacia.Controllers
{
    public class TipoUsuarioController : Controller
    {
        // GET: TipoUsuarioController
        IFarmaciaService _service;

        public TipoUsuarioController(IFarmaciaService service)
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
            return Ok(_service.TipoUsuarioAddOne(tipoUsuario));
        }

        [HttpPatch("Tipos_Usuarios")]
        public IActionResult UpdateTipoUsuario(int id,string descripcion)
        {
            TipoUsuario tipoUsuario=new TipoUsuario() { Id=id,Descripcion=descripcion};
            return Ok(_service.TipoUsuarioUpdate(tipoUsuario));
        }
    }
}
