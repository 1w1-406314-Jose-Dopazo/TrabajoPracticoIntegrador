using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;

namespace Api_Farmacia.Repositories.Implementations
{
    public class DetalleFacturaRepository : IDetalleFacturaRepository
    {
        private FarmaciaContext _context;
        public DetalleFacturaRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public DetalleFactura? Create(DetalleFactura detalleFactura)
        {
            try
            {
                _context.DetallesFacturas.Add(detalleFactura);
                _context.SaveChanges();
                return detalleFactura;
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
                DetalleFactura? detalleFactura = GetById(id);
                if (detalleFactura == null)
                {
                    return false;
                }
                _context.DetallesFacturas.Remove(detalleFactura);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteByIdFactura(int idFactura)
        {
            try
            {
                List<DetalleFactura> detallesFacturas = _context.DetallesFacturas.Where(d => d.IdFactura == idFactura).ToList();
                if (detallesFacturas.Count < 1)
                {
                    return false;
                }
                foreach (DetalleFactura detalleFactura in detallesFacturas)
                {
                    _context.DetallesFacturas.Remove(detalleFactura);
                }
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<DetalleFactura>? GetAll()
        {
            try
            {
                return _context.DetallesFacturas.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DetalleFactura? GetById(int id)
        {
            try
            {
                return _context.DetallesFacturas.Find(id);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<DetalleFactura>? GetByIdFactura(int idFactura)
        {
            try
            {
                return _context.DetallesFacturas.Where(e => e.IdFactura == idFactura).ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DetalleFactura? Update(DetalleFactura detalleFactura)
        {
            try
            {
                DetalleFactura? detalleFacturaDb = GetById(detalleFactura.Id); //Uso el metodo GetById en lugar de llamar al context.
                if (detalleFacturaDb == null)
                {
                    return null;
                }
                detalleFacturaDb.IdMedicamento = detalleFactura.IdMedicamento;
                detalleFacturaDb.IdFactura = detalleFactura.IdFactura;
                detalleFacturaDb.Cantidad = detalleFactura.Cantidad;
                detalleFacturaDb.PrecioUnitario = detalleFactura.PrecioUnitario;
                _context.SaveChanges();
                return detalleFacturaDb;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
