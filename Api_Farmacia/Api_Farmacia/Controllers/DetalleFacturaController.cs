using Api_Farmacia.Models;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
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

        [HttpPost("Detalle_Factura")]
        public IActionResult NewDetalle(int cantidad, int idFactura, int idMedicamento,decimal precioUnitario)
        {

            DetalleFactura newDetalle = new DetalleFactura() { Cantidad=cantidad,IdFactura=idFactura,IdMedicamento=idMedicamento,PrecioUnitario=precioUnitario};
            return Ok(_service.DetalleFacturaCreate(newDetalle));
        }

        [HttpPatch("Detalle_Factura")]
        public IActionResult UpdateDetalle(int cantidad, int idFactura, int idMedicamento, decimal precioUnitario)
        {
            DetalleFactura DetalleUpd = new DetalleFactura() { Cantidad = cantidad, IdFactura = idFactura, IdMedicamento = idMedicamento, PrecioUnitario = precioUnitario };
            return Ok(_service.DetalleFacturaUpdate(DetalleUpd));
        }
    }
}
