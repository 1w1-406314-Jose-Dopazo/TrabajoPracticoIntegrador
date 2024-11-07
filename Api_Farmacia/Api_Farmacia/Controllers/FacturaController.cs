using Api_Farmacia.Models;
using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
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

        [HttpPost("Factura")]
        public IActionResult NewFacturas(int idCliente, DateTime fecha)
        {
            List<DetalleFactura>lstDetalles = new List<DetalleFactura>();
            Factura newFactura = new Factura() {IdCliente = idCliente,Fecha=fecha,DetallesFacturas=lstDetalles };
            return Ok(_service.FacturaCreate(newFactura));
        }

        [HttpPatch("Factura")]
        public IActionResult UpdateFacturas(int id,int idCliente, DateTime fecha)
        {
            Factura DetalleUpd = new Factura() {Id=id,IdCliente=idCliente,Fecha=fecha };
            return Ok(_service.FacturaUpdate(DetalleUpd));
        }
    }
}
