using Api_Farmacia.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Api_Farmacia.Data.UsuarioDTOs
{
    public class UsuarioPostDTO
    {
        [Required]
        [MaxLength(100, ErrorMessage = "El nombre de usuario no debe superar los 100 caracteres")]
        public string Nombre { get; set; } = null!;

        [Required]
        [MaxLength(50, ErrorMessage = "El email no debe superar los 50 caracteres")]
        public string Email { get; set; } = null!;

        [Required]
        [MaxLength(100, ErrorMessage = "La conteaseña no debe superar los 100 caracteres")]
        public string Contraseña { get; set; } = null!;

        [Required(ErrorMessage = "Debe asignar un tipo de usuario")]
        public int IdTipoUsuario { get; set; }

        public Usuario toUsuario()
        {
            return new Usuario
            {
                Nombre = Nombre,
                Email = Email,
                Contraseña = Contraseña,
                IdTipoUsuario = IdTipoUsuario
            };
        }
    }
}
