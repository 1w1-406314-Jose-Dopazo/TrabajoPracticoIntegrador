using Api_Farmacia.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Api_Farmacia.Repositories.Implementations;
using Api_Farmacia.Data.ClienteDTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private AbstractRepository<Cliente> _repository;

        public ClienteController(AbstractRepository<Cliente> repository)
        {
            _repository = repository;
        }

        // GET: api/Cliente
        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> Get()
        {
            try
            {
                return Ok(await _repository.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //GET: api/Cliente/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetById(int id)
        {
            try
            {
                Cliente? cliente = await _repository.GetById(id);
                if (cliente is not null)
                {
                    return Ok(cliente);
                }
                return NotFound($"El cliente con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // POST api/Cliente
        [HttpPost]
        public async Task<ActionResult<Cliente>> Post(ClientePostDTO clientePostDto)
        {
            try
            {
                Cliente? clienteCreado = await _repository.Create(clientePostDto.toCliente());
                if (clienteCreado is not null)
                {
                    return CreatedAtAction(nameof(GetById), new { id = clienteCreado.Id }, clienteCreado);
                }
                return NotFound("La creacion del cliente no impactó en la base de datos");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PATCH api/Cliente/5
        [HttpPatch("{id}")]
        public async Task<ActionResult<Cliente>> Patch(int id, ClientePatchDTO clientePatchDTO)
        {
            if (id != clientePatchDTO.Id)
            {
                return BadRequest($"El ID({id}) de la URL no coincide con el ID({clientePatchDTO.Id}) del body de la request.");
            }
            try
            {
                Cliente? clienteActualizado = await _repository.Update(clientePatchDTO.toCliente());
                if (clienteActualizado is not null)
                {
                    return NoContent();
                }
                return NotFound($"El cliente con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE api/Cliente/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                if (await _repository.Delete(id))
                {
                    return Ok($"Cliente con id({id}) eliminado correctamente");
                }
                return NotFound($"El cliente con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
