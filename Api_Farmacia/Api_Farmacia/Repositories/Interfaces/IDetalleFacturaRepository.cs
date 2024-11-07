using Api_Farmacia.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface IDetalleFacturaRepository
    {
        List<DetalleFactura> GetAll();

        DetalleFactura GetById(int id);

        bool Update(DetalleFactura detalleFactura);

        bool Delete(int id);

        bool Create(DetalleFactura detalle);
    }
}
