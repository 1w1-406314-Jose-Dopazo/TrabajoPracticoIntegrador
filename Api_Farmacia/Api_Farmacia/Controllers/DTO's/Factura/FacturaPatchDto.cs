using Api_Farmacia.Controllers.DTO_s.DetalleFactura;

namespace Api_Farmacia.Controllers.DTO_s.Factura
{
    public class FacturaPatchDto
    {
        public int Id { get; set; }
        public int IdCliente { get; set; }
        public DateTime Fecha { get; set; }
        public ICollection<DetalleFacturaPatchGetDto>? DetallesFacturasDto { get; set; }
    }
}
