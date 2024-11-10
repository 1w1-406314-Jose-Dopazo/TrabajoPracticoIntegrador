using Api_Farmacia.Models;
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
            Usuario u = _usuarioService.UsuarioGetOne(model.Username);
            if (u == null || u.Contraseña != model.Password)
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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
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
