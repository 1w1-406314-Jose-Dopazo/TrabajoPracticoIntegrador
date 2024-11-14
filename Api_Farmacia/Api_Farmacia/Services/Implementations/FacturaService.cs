using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Controllers.DTO_s.Factura;
using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class FacturaService : IFacturaService
    {

        private IFacturaRepository _facturaRepository;
        private IDetalleFacturaRepository _detalleFacturaRepository;

        public FacturaService(IFacturaRepository facturaRepository, IDetalleFacturaRepository detalleFacturaRepository)
        {

            _facturaRepository = facturaRepository;
            _detalleFacturaRepository = detalleFacturaRepository;
        }

        public bool FacturaAddDetail(FacturaPatchDto dtoFactura, DetalleFacturaPostDto dtoDetalle)
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
                Factura f = _facturaRepository.GetById(factura.Id);
                _facturaRepository.AddDetail(f, detalle);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public FacturaGetDto? Create(FacturaPostDto facturaPostDto)
        {
            Factura factura = new Factura()
            {
                IdCliente = facturaPostDto.IdCliente,
                Fecha = facturaPostDto.Fecha
            };
            Factura? facturaCargada = _facturaRepository.Create(factura);
            if (facturaCargada == null)
            {
                return null;
            }
            foreach (DetalleFacturaPostDto detalleFacturaPostDto in facturaPostDto.DetallesFacturasDto)
            {
                DetalleFactura detalleFactura = new DetalleFactura()
                {
                    IdMedicamento = detalleFacturaPostDto.IdMedicamento,
                    IdFactura = facturaCargada.Id,
                    Cantidad = detalleFacturaPostDto.Cantidad,
                    PrecioUnitario = detalleFacturaPostDto.PrecioUnitario

                };
                facturaCargada.DetallesFacturas.Add(_detalleFacturaRepository.Create(detalleFactura));

            }
            return new FacturaGetDto()
            {
                Id = facturaCargada.Id,
                IdCliente = facturaCargada.IdCliente,
                Fecha = facturaCargada.Fecha,
            };
        }

        public bool Delete(int id)
        {
            if (DeleteDetalles(id))
            {
                return _facturaRepository.Delete(id);
            }
            return false;
        }

        public List<FacturaGetDto> GetAll()
        {
            List<Factura> facturas = _facturaRepository.GetAll();
            List<FacturaGetDto> facturasGetDto = new List<FacturaGetDto>();

            foreach (Factura factura in facturas)
            {
                FacturaGetDto facturaGetDto = new FacturaGetDto()
                {
                    Id = factura.Id,
                    IdCliente = factura.IdCliente,
                    Fecha = factura.Fecha
                };
                facturasGetDto.Add(facturaGetDto);
            }
            return facturasGetDto;

        }

        public FacturaGetDto? GetById(int id)
        {
            Factura? factura = _facturaRepository.GetById(id);
            return new FacturaGetDto()
            {
                Id = factura.Id,
                IdCliente = factura.IdCliente,
                Fecha = factura.Fecha
            };
        }

        public bool DeleteDetalles(int idFactura)
        {
            return _detalleFacturaRepository.DeleteByIdFactura(idFactura);
        }

        public FacturaGetDto? Update(FacturaPatchDto facturaPatchDto)
        {
            Factura? factura = new Factura()
            {
                Id = facturaPatchDto.Id,
                IdCliente = facturaPatchDto.IdCliente,
                Fecha = facturaPatchDto.Fecha
            };

            Factura? facturaActualizada = _facturaRepository.Update(factura);
            if (facturaActualizada == null)
            {
                throw new Exception("No se pudo actualizar la factura");

            }

            DeleteDetalles(facturaPatchDto.Id);

            foreach (DetalleFacturaPatchGetDto detalleFacturaPatchGetDto in facturaPatchDto.DetallesFacturasDto)
            {
                DetalleFactura detalleFactura = new DetalleFactura()
                {
                    IdFactura = detalleFacturaPatchGetDto.Id,
                    IdMedicamento = detalleFacturaPatchGetDto.IdMedicamento,
                    Cantidad = detalleFacturaPatchGetDto.Cantidad,
                    PrecioUnitario = detalleFacturaPatchGetDto.PrecioUnitario
                };
                _detalleFacturaRepository.Create(detalleFactura);
                facturaActualizada.DetallesFacturas.Add(detalleFactura);
            }
            return new FacturaGetDto()
            {
                Id = facturaActualizada.Id,
                IdCliente = facturaActualizada.IdCliente,
                Fecha = facturaActualizada.Fecha
            };
        }
    }
}
