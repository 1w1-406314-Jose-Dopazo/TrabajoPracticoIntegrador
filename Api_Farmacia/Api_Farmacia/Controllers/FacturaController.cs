using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Controllers.DTO_s.Factura;
using Api_Farmacia.Controllers.DTO_s.Medicamento;
using Api_Farmacia.Models;
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


        [HttpGet("Factura")]
        public IActionResult GetFacturas()
        {
            return Ok(_service.FacturaGetAll());
        }

        [HttpGet("Factura/{id}")]
        public IActionResult GetFacturasById(int id)
        {
            return Ok(_service.FacturaGetById(id));
        }

        [HttpDelete("Factura/{id}")]
        public IActionResult DeleteFacturas(int id)
        {
            return Ok(_service.FacturaDelete(id));
        }

        


        [HttpPost]
        public ActionResult NewFacturas(FacturaPostDto dtoFactura)
        {

            try
            {
                return Ok(_service.FacturaCreate(dtoFactura));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPatch("Factura")]
        public IActionResult UpdateFacturas(FacturaPatchGetDto dtoFactura)
        {
            return Ok(_service.FacturaUpdate(dtoFactura));
        }
    }
}
