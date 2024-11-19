using Api_Farmacia.Data.Models;
using Api_Farmacia.Data.UsuarioDTOs;
using Api_Farmacia.Repositories.Implementations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JwtAuthExample.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private LoginRepository _repositoryLogin;
        private AbstractRepository<TipoUsuario> _repositoryTipoUsuario;

        public LoginController(IConfiguration configuration, LoginRepository loginRepository, AbstractRepository<TipoUsuario> tipoUsuarioRepository)
        {
            _configuration = configuration;
            _repositoryLogin = loginRepository;
            _repositoryTipoUsuario = tipoUsuarioRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Login(UsuarioDTO usuarioDto)
        {
            Usuario usuario = await _repositoryLogin.GetUsuario(usuarioDto);
            if (usuario == null)
            {
                return BadRequest("Usuario o Contraseña invalidos");
            }
            try
            {
                //Generar el token
                string jwtToken = await GenerateToken(usuario);
                return Ok(new { token = jwtToken });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task<string> GenerateToken(Usuario usuario)
        {
            //Esto para obtener el nombre del tipo de usuario, y pasarlo como claim
            TipoUsuario? tipoUsuario = await _repositoryTipoUsuario.GetById(usuario.IdTipoUsuario);
            //Claims, para generar el token para el usuario recibido
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, usuario.Nombre),
            new Claim(ClaimTypes.Email, usuario.Email),
            new Claim("tipoUsuario", tipoUsuario.Nombre)
            };
            //llave secreta con la que se generan las credenciales para firmar el token
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            //Credencilaes para firmar el token
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            //token
            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signingCredentials);
            //Retornamos el token serializado en formato compacto en cadena
            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }

        //JWT viejo => Implementa issuer y audience
        //private string GenerateJwtToken(string username)
        //{
        //    var claims = new[]
        //    {
        //            new Claim(ClaimTypes.Name, username)
        //    };

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(
        //        issuer: _configuration["JwtSettings:Issuer"],
        //        audience: _configuration["JwtSettings:Audience"],
        //        claims: claims,
        //        expires: DateTime.Now.AddHours(1),
        //        signingCredentials: creds
        //    );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}
    }
}