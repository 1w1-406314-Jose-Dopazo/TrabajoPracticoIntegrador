using Api_Farmacia.Models;

namespace Api_Farmacia.Data
{
    public interface IDetalleFacturaRepository
    {
        List<DetalleFactura> GetAll();

        DetalleFactura GetById(int id);

        bool Update(DetalleFactura detalleFactura);

        bool Delete(int id);

        bool AddOne(DetalleFactura detalle);
    }
}
