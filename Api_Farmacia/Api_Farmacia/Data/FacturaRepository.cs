﻿using Api_Farmacia.Models;

namespace Api_Farmacia.Data
{
    public class FacturaRepository : IFacturaRepository
    {
        FarmaciaContext _context;
        public FacturaRepository(FarmaciaContext context)
        {
            _context = context;
        }
        public bool AddOne(Factura factura, List<DetalleFactura> detalles)
        {
            foreach(DetalleFactura d in detalles) 
            {
                d.IdFactura = factura.Id;
            }
            factura.DetallesFacturas = detalles;
            try
            {
                _context.Facturas.Add(factura);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                _context.Dispose();
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                _context.Facturas.Remove(GetById(id));
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                _context.Dispose();
                return false;
            }
        }

        public List<Factura> GetAll()
        {
            return _context.Facturas.ToList();
        }

        public Factura GetById(int id)
        {
            List<Factura> lstF = new List<Factura>();
            lstF = _context.Facturas.Where(f => f.Id==id).ToList();
            return lstF[0];
        }

        public bool Update(Factura factura)
        {
            try
            {
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

        public bool AddDetail(Factura factura,DetalleFactura detalle)
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
