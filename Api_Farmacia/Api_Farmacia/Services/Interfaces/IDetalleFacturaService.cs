using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IDetalleFacturaService
    {
        List<DetalleFacturaPatchGetDto> GetAll();

        bool Delete(int id);

        DetalleFacturaPatchGetDto? GetById(int id);

        DetalleFacturaPatchGetDto? Update(DetalleFacturaPatchGetDto dto);

        DetalleFacturaPatchGetDto? Create(DetalleFacturaPostDto dto);
    }
}
