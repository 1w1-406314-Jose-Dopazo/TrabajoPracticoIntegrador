using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Controllers.DTO_s.Factura;
using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IFacturaService
    {
        List<FacturaPatchGetDto> FacturaGetAll();

        FacturaPatchGetDto FacturaGetById(int id);

        bool FacturaUpdate(FacturaPatchGetDto dtoFactura);

        bool FacturaDelete(int id);

        bool FacturaCreate(FacturaPostDto factura);

        bool FacturaAddDetail(FacturaPatchGetDto dtoFactura, DetalleFacturaPostDto dtoDetalle);

    }
}
