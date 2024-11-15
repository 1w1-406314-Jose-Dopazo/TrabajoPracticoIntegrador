using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class DetalleFacturaService : IDetalleFacturaService
    {
        private IDetalleFacturaRepository _detalleFacturaRepository;

        public DetalleFacturaService(IDetalleFacturaRepository dfr)
        {

            _detalleFacturaRepository = dfr;
        }

        public DetalleFacturaPatchGetDto? Create(DetalleFacturaPostDto detalleFacturaPostDto)
        {
            DetalleFactura? detalleFactura = new DetalleFactura()
            {
                Cantidad = detalleFacturaPostDto.Cantidad,
                IdFactura = detalleFacturaPostDto.IdFactura,
                PrecioUnitario = detalleFacturaPostDto.PrecioUnitario,
                IdMedicamento = detalleFacturaPostDto.IdMedicamento
            };
            detalleFactura = _detalleFacturaRepository.Create(detalleFactura);
            if (detalleFactura != null)
            {
                return new DetalleFacturaPatchGetDto()
                {
                    Id = detalleFactura.Id,
                    Cantidad = detalleFactura.Cantidad,
                    IdFactura = detalleFactura.IdFactura,
                    IdMedicamento = detalleFactura.IdMedicamento,
                    PrecioUnitario = detalleFactura.PrecioUnitario
                };
            }
            return null;
        }

        public bool Delete(int id)
        {
            return _detalleFacturaRepository.Delete(id);
        }

        public List<DetalleFacturaPatchGetDto> GetAll()
        {
            List<DetalleFactura> detallesFacturas = _detalleFacturaRepository.GetAll();
            List<DetalleFacturaPatchGetDto> detallesFacturasPatchGetDto = new List<DetalleFacturaPatchGetDto>();

            foreach (DetalleFactura detalleFactura in detallesFacturas)
            {
                DetalleFacturaPatchGetDto detalleFacturaPatchGetDto = new DetalleFacturaPatchGetDto()
                {
                    Id = detalleFactura.Id,
                    Cantidad = detalleFactura.Cantidad,
                    IdFactura = detalleFactura.IdFactura,
                    IdMedicamento = detalleFactura.IdMedicamento,
                    PrecioUnitario = detalleFactura.PrecioUnitario
                };
                detallesFacturasPatchGetDto.Add(detalleFacturaPatchGetDto);
            };
            return detallesFacturasPatchGetDto;

        }

        public List<DetalleFacturaPatchGetDto> GetByIdFactura(int idFactura)
        {
            List<DetalleFactura> lstDetalle = _detalleFacturaRepository.GetByIdFactura(idFactura);
            List<DetalleFacturaPatchGetDto> lstDtos = new List<DetalleFacturaPatchGetDto>();

            foreach (DetalleFactura det in lstDetalle)
            {
                DetalleFacturaPatchGetDto dto = new DetalleFacturaPatchGetDto()
                {
                    Id = det.Id,
                    Cantidad = det.Cantidad,
                    IdFactura = det.IdFactura,
                    IdMedicamento = det.IdMedicamento,
                    PrecioUnitario = det.PrecioUnitario
                };
                lstDtos.Add(dto);

            }
            return lstDtos;
        }

        public DetalleFacturaPatchGetDto? GetById(int id)
        {
            DetalleFactura? detalle = _detalleFacturaRepository.GetById(id);
            return new DetalleFacturaPatchGetDto()
            {
                Id = detalle.Id,
                Cantidad = detalle.Cantidad,
                IdFactura = detalle.IdFactura,
                IdMedicamento = detalle.IdMedicamento,
                PrecioUnitario = detalle.PrecioUnitario
            };
        }

        public DetalleFacturaPatchGetDto? Update(DetalleFacturaPatchGetDto detalleFacturaPatchGetDto)
        {
            DetalleFactura? detalleFactura = new DetalleFactura()
            {
                Id = detalleFacturaPatchGetDto.Id,
                IdFactura = detalleFacturaPatchGetDto.IdFactura,
                Cantidad = detalleFacturaPatchGetDto.Cantidad,
                IdMedicamento = detalleFacturaPatchGetDto.IdMedicamento,
                PrecioUnitario = detalleFacturaPatchGetDto.PrecioUnitario
            };
            detalleFactura = _detalleFacturaRepository.Update(detalleFactura);
            if (detalleFactura != null)
            {
                return new DetalleFacturaPatchGetDto()
                {
                    Id = detalleFactura.Id,
                    IdMedicamento = detalleFactura.IdMedicamento,
                    IdFactura = detalleFactura.IdFactura,
                    Cantidad = detalleFactura.Cantidad,
                    PrecioUnitario = detalleFactura.PrecioUnitario
                };
            }
            return null;
        }
    }
}
