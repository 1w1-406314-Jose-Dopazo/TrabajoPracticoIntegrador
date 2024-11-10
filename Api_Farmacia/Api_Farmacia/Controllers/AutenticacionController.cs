using Api_Farmacia.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace JwtAuthExample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private IUsuarioService _usuarioService;
        private ITipoUsuarioService _tipoUsuarioServvice;

        public AuthController(IConfiguration configuration, ITipoUsuarioService tipoUsuarioService,IUsuarioService usuarioService)
        {
            _configuration = configuration;
            _tipoUsuarioServvice = tipoUsuarioService;
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // Aquí validarías las credenciales del usuario, por ejemplo contra una base de datos.
            if (model.Username != "usuario" || model.Password != "contraseña")
            {
                return Unauthorized();
            }

            // Si las credenciales son válidas, genera el JWT
            var token = GenerateJwtToken(model.Username);

            return Ok(new { token });
        }

        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
