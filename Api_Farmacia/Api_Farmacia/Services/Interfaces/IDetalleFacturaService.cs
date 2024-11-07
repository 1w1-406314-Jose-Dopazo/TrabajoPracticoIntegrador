using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IDetalleFacturaService
    {
        List<DetalleFactura> DetalleFacturaGetAll();

        DetalleFactura DetalleFacturatGetById(int id);

        bool DetalleFacturaUpdate(DetalleFactura detalleFactura);

        bool DetalleFacturaDelete(int id);

        bool DetalleFacturaCreate(DetalleFactura detalle);
    }
}
