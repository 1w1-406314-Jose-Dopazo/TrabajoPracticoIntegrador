using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Controllers.DTO_s.Factura;
using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class FacturaService : IFacturaService
    {

        private IFacturaRepository _Factura_Repository;
        private IDetalleFacturaRepository _detalleFacturaRepository;

        public FacturaService(IFacturaRepository fr,IDetalleFacturaRepository dfr)
        {

            _Factura_Repository = fr;
            _detalleFacturaRepository = dfr;
        }

        public bool FacturaAddDetail(FacturaPatchGetDto dtoFactura, DetalleFacturaPostDto dtoDetalle)
        {
            DetalleFactura detalle = new DetalleFactura()
            {
                Cantidad = dtoDetalle.Cantidad,
                IdFactura = dtoFactura.Id,
                IdMedicamento = dtoDetalle.IdMedicamento,
                PrecioUnitario = dtoDetalle.PrecioUnitario
            };

            Factura factura = new Factura()
            {
                Id = dtoFactura.Id,
                IdCliente = dtoFactura.IdCliente,
                Fecha = Convert.ToDateTime(dtoFactura.Fecha)

            };
            try
            {
                Factura f = _Factura_Repository.GetById(factura.Id);
                _Factura_Repository.AddDetail(f, detalle);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool FacturaCreate(FacturaPostDto dtoFactura)
        {

            Factura factura = new Factura()
            {
                IdCliente = dtoFactura.IdCliente,
                Fecha = dtoFactura.Fecha
            };
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

        public List<FacturaPatchGetDto> FacturaGetAll()
        {
            List<Factura> lstFacturas = new List<Factura>();
            lstFacturas =  _Factura_Repository.GetAll();
            List<FacturaPatchGetDto> lstDtos = new List<FacturaPatchGetDto>();
            foreach (Factura factura in lstFacturas)
            {
                FacturaPatchGetDto dto = new FacturaPatchGetDto()
                {
                    Id = factura.Id,
                    IdCliente = factura.IdCliente,
                    Fecha = DateOnly.Parse(factura.Fecha.ToShortDateString())



                }; 
                    lstDtos.Add(dto);
            }
            return lstDtos;

        }

        public FacturaPatchGetDto FacturaGetById(int id)
        {
            Factura factura = _Factura_Repository.GetById(id);
            FacturaPatchGetDto dto = new FacturaPatchGetDto()
            {
                Id = factura.Id, 
                IdCliente = factura.IdCliente, 
                Fecha = DateOnly.Parse(factura.Fecha.ToShortDateString())
            };

            return dto;
        }

        public bool FacturaUpdate(FacturaPatchGetDto dtoFactura)
        {
            Factura factura = new Factura()
            {
                Id = dtoFactura.Id,
                IdCliente = dtoFactura.IdCliente,
                Fecha = dtoFactura.Fecha.ToDateTime(TimeOnly.Parse("12:00 AM"))

            };
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
