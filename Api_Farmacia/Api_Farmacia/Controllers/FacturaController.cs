using Api_Farmacia.Data.FacturaDTOs;
using Api_Farmacia.Data.MedicamentoDTOs;
using Api_Farmacia.Data.Models;
using Api_Farmacia.Repositories.Implementations;
using Api_Farmacia.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : Controller
    {
        private AbstractRepository<Factura> _repositoryFactura;

        public FacturaController(AbstractRepository<Factura> repositoryFactura)
        {
            _repositoryFactura = repositoryFactura;
        }

        // GET: api/Factura
        [HttpGet]
        public async Task<ActionResult<List<Factura>>> GetAll()
        {
            try
            {
                return Ok(await _repositoryFactura.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET api/Factura/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Factura>> GetById(int id)
        {
            try
            {
                Factura? factura = await _repositoryFactura.GetById(id);
                if (factura is not null)
                {
                    return Ok(factura);
                }
                return NotFound($"La factura con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // POST api/Factura
        [HttpPost]
        public async Task<ActionResult<Factura>> Post(FacturaPostDTO facturaPostDto)
        {
            try
            {
                Console.WriteLine(facturaPostDto);
                if(!facturaPostDto.DetallesFacturas.Any())
                {
                    return BadRequest("No se puede cargar una factura sin detalles");
                }
                
                Factura? facturaCreada = await _repositoryFactura.Create(facturaPostDto.toFactura());

                if (facturaCreada is not null)
                {
                    return CreatedAtAction(nameof(GetById), new { id = facturaCreada.Id }, facturaCreada);
                }

                return NotFound("La creacion de la factura no impactó en la base de datos");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PATCH api/Factura/5
        [HttpPatch("{id}")]
        public async Task<ActionResult<Factura>> Patch(int id, FacturaPatchDTO facturaPatchDto)
        {
            if (id != facturaPatchDto.Id)
            {
                return BadRequest($"El ID({id}) de la URL no coincide con el ID({facturaPatchDto.Id}) del body de la request.");
            }
            try
            {
                Factura? facturaActualizada = await _repositoryFactura.Update(facturaPatchDto.toFactura());
                if (facturaActualizada is not null)
                {
                    return NoContent();
                }
                return NotFound($"La factura con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE api/Factura/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteFacturas(int id)
        {
            try
            {
                if (await _repositoryFactura.Delete(id))
                {
                    return Ok($"Factura con id({id}) fue eliminada correctamente");
                }
                return NotFound($"La factura con ID({id}) no existe.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
