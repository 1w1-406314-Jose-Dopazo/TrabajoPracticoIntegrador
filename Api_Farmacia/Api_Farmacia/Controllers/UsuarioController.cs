<<<<<<< HEAD
﻿using Api_Farmacia.Controllers.DTO_s.Factura;
using Api_Farmacia.Controllers.DTO_s.Usuario;
using Api_Farmacia.Models;
using Api_Farmacia.Services.Interfaces;
=======
﻿using Api_Farmacia.Data.Models;
using Api_Farmacia.Data.UsuarioDTOs;
using Api_Farmacia.Repositories.Implementations;
>>>>>>> Branch-Lautaro
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private AbstractRepository<Usuario> _repositoryUsuario;
        private AbstractRepository<TipoUsuario> _repositoryTipoUsuario;

        public UsuarioController(AbstractRepository<Usuario> repositoryUsuario, AbstractRepository<TipoUsuario> repositoryTipoUsuario)
        {
            _repositoryUsuario = repositoryUsuario;
            _repositoryTipoUsuario = repositoryTipoUsuario;
        }

<<<<<<< HEAD

        [HttpGet("Usuarios")]
        public ActionResult<UsuarioPatchGetDto> GetUsuarios()
=======
        // GET: api/Usuario
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> GetAll()
>>>>>>> Branch-Lautaro
        {
            try
            {
                return Ok(await _repositoryUsuario.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET api/Usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetById(int id)
        {
            try
            {
                Usuario? usuario = await _repositoryUsuario.GetById(id);

                if (usuario is not null)
                {
                    return Ok(usuario);
                }
                return NotFound($"El usuario con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // POST api/Usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post(UsuarioPostDTO usuarioPostDto)
        {
            try
            {
                if (await _repositoryTipoUsuario.GetById(usuarioPostDto.IdTipoUsuario) is null)
                {
                    return BadRequest($"El tipo de usuario ID({usuarioPostDto.IdTipoUsuario}) no existe");
                }
                Usuario? usuarioCreado = await _repositoryUsuario.Create(usuarioPostDto.toUsuario());
                if (usuarioCreado is not null)
                {
                    return CreatedAtAction(nameof(GetById), new { id = usuarioCreado.Id }, usuarioCreado);
                }
                return NotFound("La creacion del usuario no impactó en la base de datos");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PATCH api/Medicamento/5
        [HttpPatch]
        public async Task<ActionResult<Usuario>> Patch(int id, UsuarioPatchDTO usuarioPatchDto)
        {
            if (id != usuarioPatchDto.Id)
            {
                return BadRequest($"El ID({id}) de la URL no coincide con el ID({usuarioPatchDto.Id}) del body de la request.");
            }
            try
            {
                if (await _repositoryTipoUsuario.GetById(usuarioPatchDto.IdTipoUsuario) is null)
                {
                    return BadRequest($"El tipo de usuario ID({usuarioPatchDto.IdTipoUsuario}) no existe");
                }
                Usuario? usuarioActualizado = await _repositoryUsuario.Update(usuarioPatchDto.toUsuario());
                if (usuarioActualizado is not null)
                {
                    return NoContent();
                }
                return NotFound($"El usuario con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

<<<<<<< HEAD
        [HttpPost("Usuarios")]
        public ActionResult NewUsuario([FromBody] UsuarioPostDto usuario)
        {

            try
            {
                return Created(string.Empty, _service.UsuarioCreate(usuario));
=======
        // DELETE api/Usuario/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                if (await _repositoryUsuario.Delete(id))
                {
                    return Ok($"Usuario con id({id}) eliminado correctamente");
                }
                return NotFound($"El usuario con ID({id}) no existe.");
>>>>>>> Branch-Lautaro
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
<<<<<<< HEAD
        }

        [HttpPatch("Usuarios")]
        public ActionResult UpdateUsuario([FromBody]UsuarioPatchGetDto usuario)
        {
            
            return Ok(_service.UsuarioUpdate(usuario));
=======
>>>>>>> Branch-Lautaro
        }
    }
}
