using Api_Farmacia.Data.Models;
using Api_Farmacia.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api_Farmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleFacturaController : Controller
    {
        //IDetalleFacturaService _service;

        //public DetalleFacturaController(IDetalleFacturaService service)
        //{
        //    _service = service;
        //}


        //[HttpGet]
        //public ActionResult<List<DetalleFactura>> Get()
        //{
        //    try
        //    {
        //        return Ok(_service.GetAll());
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}

        //[HttpGet("{id}")]
        //public ActionResult<DetalleFactura> Get(int id)
        //{
        //    throw new NotImplementedException();
        //    //try
        //    //{
        //    //    return Ok(_service.GetById(id));
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    return BadRequest(ex);
        //    //}
        //}

        //[HttpGet("GetByFactura")]
        //public ActionResult<DetalleFactura> GetByFactura(int id)
        //{
        //    throw new NotImplementedException();
        //    //try
        //    //{
        //    //    return Ok(_service.GetByIdFactura(id));
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    return BadRequest(ex);
        //    //}
        //}

        //[HttpDelete("{id}")]
        //public ActionResult Delete(int id)
        //{
        //    try
        //    {
        //        if (_service.Delete(id))
        //        {
        //            return Ok();
        //        }
        //        return BadRequest("El detalle no existe");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}

        //[HttpPost]
        //public ActionResult Post(DetalleFactura detalleFacturaPostDto)
        //{
        //    throw new NotImplementedException();
        //    //    try
        //    //    {
        //    //        return Created(string.Empty, _service.Create(detalleFacturaPostDto));
        //    //    }
        //    //    catch (Exception ex)
        //    //    {
        //    //        return BadRequest(ex);
        //    //    }
        //}

        //[HttpPatch("Detalle_Factura")]
        //public ActionResult<DetalleFactura> UpdateDetalle(DetalleFactura detalleFacturaPatchGetDto)
        //{
        //    throw new NotImplementedException();
        //    //try
        //    //{
        //    //    DetalleFacturaPatchGetDto? detalleFacturaActualizado = _service.Update(detalleFacturaPatchGetDto);
        //    //    if (detalleFacturaActualizado != null)
        //    //    {
        //    //        return Created(string.Empty, detalleFacturaActualizado);
        //    //    }
        //    //    return NotFound($"El detalle no existe");
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    return BadRequest(ex);
        //    //}
        //}

    }
}
