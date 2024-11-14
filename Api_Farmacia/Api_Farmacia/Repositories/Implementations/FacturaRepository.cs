using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;

namespace Api_Farmacia.Repositories.Implementations
{
    public class FacturaRepository : IFacturaRepository
    {
        private FarmaciaContext _context;
        public FacturaRepository(FarmaciaContext context)
        {
            _context = context;
        }
        public Factura? Create(Factura factura)
        {
            try
            {
                _context.Facturas.Add(factura);
                _context.SaveChanges();
                return factura;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                Factura? factura = GetById(id);
                if (factura == null)
                {
                    return false;
                }
                _context.Facturas.Remove(factura);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Factura> GetAll()
        {
            try
            {
                return _context.Facturas.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Factura? GetById(int id)
        {
            try
            {
                return _context.Facturas.Find(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Factura? Update(Factura factura)
        {
            try
            {
                Factura? facturaDb = GetById(factura.Id); //Uso el metodo GetById en lugar de llamar al context.
                if (facturaDb == null)
                {
                    return null;
                }
                facturaDb.IdCliente = factura.IdCliente;
                facturaDb.Fecha = factura.Fecha;
                //facturaDb.DetallesFacturas = factura.DetallesFacturas;
                _context.SaveChanges();
                return facturaDb;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool AddDetail(Factura factura, DetalleFactura detalle)
        {
            try
            {
                factura.DetallesFacturas.Add(detalle);
                _context.Facturas.Update(factura);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                _context.Dispose();
                return false;
            }
        }
    }
}
