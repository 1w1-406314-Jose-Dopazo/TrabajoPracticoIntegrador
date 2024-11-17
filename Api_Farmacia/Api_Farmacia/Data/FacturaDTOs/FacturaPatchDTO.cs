using Api_Farmacia.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Api_Farmacia.Data.FacturaDTOs
{
    public class FacturaPatchDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int? IdCliente { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime Fecha { get; set; }
        [Required(ErrorMessage = "No se puede cargar una factura sin detalles")]
        public virtual ICollection<DetalleFacturaPostDTO> DetallesFacturas { get; set; } = new List<DetalleFacturaPostDTO>();

        public Factura toFactura()
        {
            Factura factura = new Factura
            {
                Id = Id,
                IdCliente = IdCliente,
                Fecha = Fecha
            };
            foreach (DetalleFacturaPostDTO detalleFacturaPostDto in DetallesFacturas)
            {
                factura.DetallesFacturas.Add(detalleFacturaPostDto.toDetalleFactura());
            }
            return factura;
        }
    }
}
