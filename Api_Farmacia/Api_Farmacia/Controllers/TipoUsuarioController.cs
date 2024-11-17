using Api_Farmacia.Data.Models;
using Api_Farmacia.Repositories.Implementations;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoUsuarioController : ControllerBase
    {
        private AbstractRepository<TipoUsuario> _repository;

        public TipoUsuarioController(AbstractRepository<TipoUsuario> repository)
        {
            _repository = repository;
        }

        // GET: api/TipoUsuario
        [HttpGet]
        public async Task<ActionResult<List<TipoUsuario>>> GetAll()
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

        // GET api/TipoUsuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoUsuario>> GetById(int id)
        {
            try
            {
                TipoUsuario? tipoUsuario = await _repository.GetById(id);
                if (tipoUsuario is not null)
                {
                    return Ok(tipoUsuario);
                }
                return NotFound($"El tipo de usuario con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //// POST api/<TipoUsuarioController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<TipoUsuarioController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<TipoUsuarioController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
