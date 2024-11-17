using Api_Farmacia.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Api_Farmacia.Repositories.Implementations;
using Api_Farmacia.Data.MedicamentoDTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicamentoController : ControllerBase
    {
        private AbstractRepository<Medicamento> _repository;

        public MedicamentoController(AbstractRepository<Medicamento> repository)
        {
            _repository = repository;
        }

        // GET: api/Medicamento
        [HttpGet]
        public async Task<ActionResult<List<Medicamento>>> GetAll()
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

        // GET api/Medicamento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Medicamento>> GetById(int id)
        {
            try
            {
                Medicamento? medicamento = await _repository.GetById(id);
                if (medicamento is not null)
                {
                    return Ok(medicamento);
                }
                return NotFound($"El medicamento con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // POST api/Medicamento
        [HttpPost]
        public async Task<ActionResult<Medicamento>> Post(MedicamentoPostDTO medicamentoPostDto)
        {
            try
            {
                Medicamento? medicamentoCreado = await _repository.Create(medicamentoPostDto.toMedicamento());
                if (medicamentoCreado is not null)
                {
                    return CreatedAtAction(nameof(GetById), new { id = medicamentoCreado.Id }, medicamentoCreado);
                }
                return NotFound("La creacion del medicamento no impactó en la base de datos");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PATCH api/Medicamento/5
        [HttpPatch("{id}")]
        public async Task<ActionResult<Medicamento>> Patch(int id, MedicamentoPatchDTO medicamentoPatchDto)
        {
            if (id != medicamentoPatchDto.Id)
            {
                return BadRequest($"El ID({id}) de la URL no coincide con el ID({medicamentoPatchDto.Id}) del body de la request.");
            }
            try
            {
                Medicamento? medicamentoActualizado = await _repository.Update(medicamentoPatchDto.toMedicamento());
                if (medicamentoActualizado is not null)
                {
                    return NoContent();
                }
                return NotFound($"El medicamento con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE api/Medicamento/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                if (await _repository.Delete(id))
                {
                    return Ok($"Medicamento con id({id}) eliminado correctamente");
                }
                return NotFound($"El medicamento con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
