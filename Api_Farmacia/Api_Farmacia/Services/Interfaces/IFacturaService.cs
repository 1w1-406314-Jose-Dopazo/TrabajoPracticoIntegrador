using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IFacturaService
    {
        List<Factura> FacturaGetAll();

        Factura FacturaGetById(int id);

        bool FacturaUpdate(Factura factura);

        bool FacturaDelete(int id);

        bool FacturaCreate(Factura factura);

        bool FacturaAddDetail(Factura factura, DetalleFactura detalle);

    }
}
