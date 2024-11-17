using Api_Farmacia.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Api_Farmacia.Data.FacturaDTOs
{
    public class DetalleFacturaPostDTO
    {
        [Required]
        public int IdMedicamento { get; set; }
        [Required]
        public int Cantidad { get; set; }
        [Required]
        public decimal PrecioUnitario { get; set; }

        public DetalleFactura toDetalleFactura()
        {
            return new DetalleFactura
            {
                IdMedicamento = IdMedicamento,
                Cantidad = Cantidad,
                PrecioUnitario = PrecioUnitario
            };
        }
    }
}
