using Api_Farmacia.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Api_Farmacia.Data.TipoUsuarioDTOs
{
    public class TipoUsuarioPatchDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "El nombre del tipo de usuario no debe exceder los 100 caracteres")]
        public string Nombre { get; set; } = null!;
        [Required]
        [MaxLength(100, ErrorMessage = "La descripcion del tipo de usuario no debe exceder los 100 caracteres")]
        public string Descripcion { get; set; } = null!;

        public TipoUsuario toTipoUsuario()
        {
            return new TipoUsuario { Id = Id, Nombre = Nombre, Descripcion = Descripcion };
        }
    }
}
