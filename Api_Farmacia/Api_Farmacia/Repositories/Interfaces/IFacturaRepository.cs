using Api_Farmacia.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface IFacturaRepository
    {
        List<Factura> GetAll();

        Factura GetById(int id);

        bool Update(Factura factura);

        bool Delete(int id);

        bool AddOne(Factura factura, List<DetalleFactura> detalles);

        bool AddDetail(Factura factura, DetalleFactura detalle);
    }
}
