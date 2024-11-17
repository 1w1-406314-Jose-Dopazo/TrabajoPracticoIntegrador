using Api_Farmacia.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Api_Farmacia.Data.UsuarioDTOs
{
    public class UsuarioPatchDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "El nombre de usuario no debe superar los 100 caracteres")]
        public string Nombre { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "La conteaseña no debe superar los 100 caracteres")]
        public string Contraseña { get; set; }
        [Required]
        public int IdTipoUsuario { get; set; }

        public Usuario toUsuario()
        {
            return new Usuario
            {
                Id = Id,
                Nombre = Nombre,
                Contraseña = Contraseña,
                IdTipoUsuario = IdTipoUsuario
            };
        }
    }
}
