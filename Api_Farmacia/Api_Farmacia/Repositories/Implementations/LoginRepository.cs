using Api_Farmacia.Data;
using Api_Farmacia.Data.Models;
using Api_Farmacia.Data.UsuarioDTOs;
using Microsoft.EntityFrameworkCore;

namespace Api_Farmacia.Repositories.Implementations
{
    public class LoginRepository
    {
        private FarmaciaContext _context;
        public LoginRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> GetUsuario(UsuarioDTO usuarioDto)
        {
            return await _context.Usuarios.SingleOrDefaultAsync(x => x.Nombre == usuarioDto.Nombre && x.Contraseña == usuarioDto.Contraseña);
        }
    }
}
