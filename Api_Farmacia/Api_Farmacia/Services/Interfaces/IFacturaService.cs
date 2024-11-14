using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Controllers.DTO_s.Factura;
using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IFacturaService
    {
        List<FacturaGetDto> GetAll();

        bool Delete(int id);

        FacturaGetDto? GetById(int id);

        FacturaGetDto? Update(FacturaPatchDto dtoFactura);

        FacturaGetDto? Create(FacturaPostDto factura);

        bool FacturaAddDetail(FacturaPatchDto dtoFactura, DetalleFacturaPostDto dtoDetalle);

    }
}
