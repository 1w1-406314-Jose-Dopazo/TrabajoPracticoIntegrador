using Api_Farmacia.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface IDetalleFacturaRepository
    {
        List<DetalleFactura> GetAll();

        List<DetalleFactura> GetByIdFactura(int idFactura);

        bool Delete(int id);

        bool DeleteByIdFactura(int idFactura);

        DetalleFactura? GetById(int id);

        DetalleFactura? Update(DetalleFactura detalleFactura);

        DetalleFactura? Create(DetalleFactura detalleFactura);
    }
}
