using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Implementations;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicamentoController : ControllerBase
    {
        private IMedicamentoService _service;

        public MedicamentoController(IMedicamentoService service)
        {
            _service = service;
        }

        // GET: api/<MedicamentoController>
        [HttpGet]
        public ActionResult<List<Medicamento>> Get()
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

        // GET api/<MedicamentoController>/5
        [HttpGet("{id}")]
        public ActionResult<Medicamento> Get(int id)
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

        // POST api/<MedicamentoController>
        [HttpPost]
        //TODO: PONERLO COMO FROMBODY, para pasarlo como json desde el front
        public ActionResult Post(int id, string nombre, string descripcion, bool estado = true)
        {
            Medicamento medicamento = new Medicamento()
            {
                Id = id,
                Nombre = nombre,
                Descripcion = descripcion,
                Estado = estado
            };
            try
            {
                _service.Create(medicamento);
                return Created(string.Empty, medicamento.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PUT api/<MedicamentoController>/5
        [HttpPut("{id}")]
        public ActionResult<Medicamento> Put(int id, string nombre, string descripcion, bool estado)
        {
            Medicamento medicamento = new Medicamento()
            {
                Id = id, Nombre = nombre, Descripcion = descripcion, Estado = estado
            };
            try
            {
                if (_service.Update(medicamento))
                {
                    return Created();
                }
                return NotFound($"El medicamento no existe");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE api/<MedicamentoController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                if (_service.LogicDelete(id))
                {
                    return Ok();
                }
                return BadRequest($"El medicamento no existe");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
