using Api_Farmacia.Controllers.DTO_s.Cliente;
using Api_Farmacia.Controllers.DTO_s.Medicamento;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private IClienteService _service;

        public ClienteController(IClienteService service)
        {
            _service = service;
        }

        // GET: api/<ClienteController>
        [HttpGet]
        public ActionResult<List<ClientePatchGetDto>> Get()
        {
            try
            {
                return Ok(_service.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET api/<ClienteController>/5
        [HttpGet("{id}")]
        public ActionResult<ClientePatchGetDto> Get(int id)
        {
            try
            {
                return Ok(_service.GetById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // POST api/<ClienteController>
        [HttpPost]
        public ActionResult<ClientePatchGetDto> Post(ClientePostDto clientePostDto)
        {
            try
            {
                return Created(string.Empty, _service.Create(clientePostDto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public ActionResult<ClientePatchGetDto> Patch(ClientePatchGetDto clientePatchGetDto)
        {
            try
            {
                ClientePatchGetDto? clienteActualizado = _service.Update(clientePatchGetDto);
                if (clienteActualizado != null)
                {
                    return Created(string.Empty, clienteActualizado);
                }
                return NotFound($"El cliente no existe");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                if (_service.Delete(id))
                {
                    return Ok();
                }
                return BadRequest($"El cliente con id {id} no existe");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
