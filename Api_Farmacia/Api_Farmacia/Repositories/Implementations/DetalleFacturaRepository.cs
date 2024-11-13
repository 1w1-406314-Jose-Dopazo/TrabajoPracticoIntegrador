﻿using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Implementations;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Repositories.Implementations
{
    public class DetalleFacturaRepository : IDetalleFacturaRepository
    {
        private FarmaciaContext _context;
        private IMedicamentoService _mediicamentoService;
        public DetalleFacturaRepository(FarmaciaContext context,IMedicamentoService medicamentoService)
        {
            _context = context;
            _mediicamentoService = medicamentoService;
        }
        public bool Create(DetalleFactura detalle)
        {
            if(_mediicamentoService.GetById(detalle.IdMedicamento) == null) 
            {

                return false;
            }
            

            try
            {
                _context.DetallesFacturas.Add(detalle);
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
                _context.DetallesFacturas.Remove(GetById(id));
                _context.SaveChanges();
                return true;

            }
            catch (Exception)
            {

                _context.Dispose();
                return false;
            }
        }

        public List<DetalleFactura> GetAll()
        {
            return _context.DetallesFacturas.ToList();
        }

        public DetalleFactura GetById(int id)
        {
            List<DetalleFactura> listD = new List<DetalleFactura>();
            listD = _context.DetallesFacturas.Where(d => d.Id == id).ToList();
            return listD[0];

        }

        public bool Update(DetalleFactura detalleFactura)
        {
            try
            {
                _context.DetallesFacturas.Update(detalleFactura);
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
