namespace Api_Farmacia.Controllers.DTO_s.Usuario
{
    public class UsuarioPatchGetDto
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Contraseña { get; set; }

        public int IdTipoUsuario { get; set; }
    }
}
