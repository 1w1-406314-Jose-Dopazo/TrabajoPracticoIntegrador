using Api_Farmacia.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface IFacturaRepository
    {
        List<Factura> GetAll();

        bool Delete(int id);

        Factura? GetById(int id);

        Factura? Update(Factura factura);

        Factura? Create(Factura factura);

        bool AddDetail(Factura factura, DetalleFactura detalle);
    }
}
