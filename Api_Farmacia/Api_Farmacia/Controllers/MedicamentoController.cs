using Api_Farmacia.Controllers.DTO_s.Medicamento;
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
        public ActionResult<List<MedicamentoPatchGetDto>> Get()
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
        public ActionResult<MedicamentoPatchGetDto> Get(int id)
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
        public ActionResult<MedicamentoPatchGetDto> Post(MedicamentoPostDto medicamentoPostDto)
        {
            try
            {
               return Created(string.Empty ,_service.Create(medicamentoPostDto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PUT api/<MedicamentoController>/5
        [HttpPatch]
        public ActionResult<MedicamentoPatchGetDto> Patch(MedicamentoPatchGetDto medicamentoPatchGetDto)
        {
            try
            {
                MedicamentoPatchGetDto? medicamentoActualizado = _service.Update(medicamentoPatchGetDto);
                if (medicamentoActualizado != null)
                {
                    return Created(string.Empty, medicamentoActualizado);
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
