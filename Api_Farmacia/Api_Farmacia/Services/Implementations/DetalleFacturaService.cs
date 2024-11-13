using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class DetalleFacturaService : IDetalleFacturaService
    {
        private IDetalleFacturaRepository _Detalle_Factura_Repository;

        public DetalleFacturaService(IDetalleFacturaRepository dfr)
        {

            _Detalle_Factura_Repository = dfr;
        }

        public bool DetalleFacturaCreate(DetalleFacturaPostDto dto)
        {
                DetalleFactura detalle = new DetalleFactura()
                {
                    Cantidad = dto.Cantidad,
                    IdFactura = dto.IdFactura,
                    PrecioUnitario = dto.PrecioUnitario,
                    IdMedicamento = dto.IdMedicamento
                };
            try
            {
                _Detalle_Factura_Repository.Create(detalle);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool DetalleFacturaDelete(int id)
        {
            try
            {
                _Detalle_Factura_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<DetalleFactura> DetalleFacturaGetAll()
        {
            return _Detalle_Factura_Repository.GetAll();
        }

        public DetalleFactura DetalleFacturatGetById(int id)
        {
            return _Detalle_Factura_Repository.GetById(id);
        }

        public bool DetalleFacturaUpdate(DetalleFacturaPutDto dto)
        {
            DetalleFactura detalleFactura = new DetalleFactura()
            {
                Id=dto.Id,
                IdFactura=dto.IdFactura,
                Cantidad=dto.Cantidad,
                IdMedicamento=dto.IdMedicamento,
                PrecioUnitario=dto.PrecioUnitario
            };
            try
            {
                return _Detalle_Factura_Repository.Update(detalleFactura);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
