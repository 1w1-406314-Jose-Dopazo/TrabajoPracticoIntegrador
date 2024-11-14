using Api_Farmacia.Controllers.DTO_s.Factura;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : Controller
    {
        IFacturaService _service;

        public FacturaController(IFacturaService service)
        {
            _service = service;
        }


        [HttpGet]
        public ActionResult<List<FacturaGetDto>> GetFacturas()
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

        [HttpGet("{id}")]
        public ActionResult<FacturaGetDto> GetFacturasById(int id)
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

        [HttpPost]
        public ActionResult<FacturaGetDto> NewFacturas(FacturaPostDto facturaPostDto)
        {
            try
            {
                return Created(string.Empty, _service.Create(facturaPostDto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPatch]
        public ActionResult<FacturaGetDto> UpdateFacturas(FacturaPatchDto facturaPatchDto)
        {
            try
            {
                FacturaGetDto? facturaActualizada = _service.Update(facturaPatchDto);
                if (facturaActualizada != null)
                {
                    return Created(string.Empty, facturaActualizada);
                }
                return NotFound($"La factura no existe");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteFacturas(int id)
        {
            try
            {
                if (_service.Delete(id))
                {
                    return Ok();
                }
                return BadRequest($"La factura no existe");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
