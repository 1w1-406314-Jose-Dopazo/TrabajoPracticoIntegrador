using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class FacturaService : IFacturaService
    {

        IFacturaRepository _Factura_Repository;
        IDetalleFacturaRepository _detalleFacturaRepository;

        public FacturaService(IFacturaRepository fr,IDetalleFacturaRepository dfr)
        {

            _Factura_Repository = fr;
            _detalleFacturaRepository = dfr;
        }

        public bool FacturaAddDetail(int IdFactura, DetalleFactura detalle)
        {
            try
            {
                Factura factura=_Factura_Repository.GetById(IdFactura);
                _Factura_Repository.AddDetail(factura, detalle);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool FacturaCreate(Factura factura)
        {
            try
            {
                
                _Factura_Repository.Create(factura);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool FacturaDelete(int id)
        {
            try
            {
                _Factura_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<Factura> FacturaGetAll()
        {
            return _Factura_Repository.GetAll();
        }

        public Factura FacturaGetById(int id)
        {
            return _Factura_Repository.GetById(id);
        }

        public bool FacturaUpdate(Factura factura)
        {
            try
            {
                _Factura_Repository.Update(factura);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
