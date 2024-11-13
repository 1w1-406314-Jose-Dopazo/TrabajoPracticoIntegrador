using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Controllers.DTO_s.Medicamento;
using Api_Farmacia.Models;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleFacturaController : Controller
    {
        IDetalleFacturaService _service;

        public DetalleFacturaController(IDetalleFacturaService service)
        {
            _service = service;
        }


        [HttpGet("Detalle_Factura")]
        public IActionResult GetDetalles()
        {
            return Ok(_service.DetalleFacturaGetAll());
        }

        [HttpGet("Detalle_Factura/{id}")]
        public IActionResult GetDetalleById(int id)
        {
            return Ok(_service.DetalleFacturatGetById(id));
        }

        [HttpDelete("Detalle_Factura/{id}")]
        public IActionResult DeleteDetalle(int id)
        {
            return Ok(_service.DetalleFacturaDelete(id));
        }

      


        [HttpPost]
        public ActionResult NewDetalle(DetalleFacturaPostDto dtoDetalle)
        {

            try
            {
                return Ok(_service.DetalleFacturaCreate(dtoDetalle));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }




        [HttpPatch("Detalle_Factura")]
        public ActionResult<DetalleFacturaPutDto> UpdateDetalle(DetalleFacturaPutDto dtoDetalle)
        {

            try
            {
                if (_service.DetalleFacturaUpdate(dtoDetalle))
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

    }
}
