using System.ComponentModel.DataAnnotations;
using Api_Farmacia.Data.Models;

namespace Api_Farmacia.Data.MedicamentoDTOs
{
    public class MedicamentoPatchDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "El nombre no debe superar los 100 caracteres")]
        public string Nombre { get; set; } = null!;

        [Required]
        public bool Estado { get; set; }

        [MaxLength(255, ErrorMessage = "La descripcion no debe superar los 255 caracteres")]
        public string? Descripcion { get; set; }
        [Required]
        public decimal PrecioUnitario { get; set; }

        public Medicamento toMedicamento()
        {
            return new Medicamento
            {
                Id = Id,
                Nombre = Nombre,
                Estado = Estado,
                Descripcion = Descripcion,
                PrecioUnitario = PrecioUnitario
            };
        }
    }
}
