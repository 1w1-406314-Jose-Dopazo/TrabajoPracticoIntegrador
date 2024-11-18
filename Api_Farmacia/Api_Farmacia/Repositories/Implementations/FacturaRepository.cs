using Api_Farmacia.Data;
using Api_Farmacia.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace Api_Farmacia.Repositories.Implementations
{
    public class FacturaRepository : AbstractRepository<Factura>
    {
        public FacturaRepository(FarmaciaContext context) : base(context)
        {
        }

        public override async Task<Factura?> GetById(int id)
        {
            return await _context.Set<Factura>().Include(f => f.DetallesFacturas).FirstOrDefaultAsync(f => f.Id == id);
        }

        public override async Task<bool> Delete(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync(); //Inicia la transaccion
            try
            {
                Factura? entidad = await GetById(id);
                if (entidad is not null)
                {
                    _context.DetallesFacturas.RemoveRange(entidad.DetallesFacturas.ToList());
                    _context.Facturas.Remove(entidad);
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return true;
                }
                return false;
            }
            catch(Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public override async Task<Factura?> Update(Factura entidad)
        {
            using var transaction = await _context.Database.BeginTransactionAsync(); // Inicia una transacción
            try
            {
                Factura? facturaExistente = await GetById(entidad.Id);

                if (facturaExistente is not null)
                {
                    facturaExistente.IdCliente = entidad.IdCliente;
                    facturaExistente.Fecha = entidad.Fecha;

                    // Actualizacion de detalles

                    // Eliminar los detalles de la factura existente
                    _context.DetallesFacturas.RemoveRange(facturaExistente.DetallesFacturas.ToList());

                    // Actualizar los detalles existentes y cargar los nuevos
                    if (entidad.DetallesFacturas.Count() > 0)
                    {
                    foreach (DetalleFactura detalleNuevo in entidad.DetallesFacturas)
                    {
                        facturaExistente.DetallesFacturas.Add(new DetalleFactura
                        {
                            Cantidad = detalleNuevo.Cantidad,
                            PrecioUnitario = detalleNuevo.PrecioUnitario,
                            IdMedicamento = detalleNuevo.IdMedicamento
                        });
                    }

                    }
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }

                return await GetById(entidad.Id);
            }
            catch
            {
                await transaction.RollbackAsync(); // Rollback si hay excepciones
                throw;
            }
        }

    }
}
