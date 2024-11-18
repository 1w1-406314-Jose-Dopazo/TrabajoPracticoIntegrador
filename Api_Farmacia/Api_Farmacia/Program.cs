using Api_Farmacia.Data;
using Api_Farmacia.Data.Models;
using Api_Farmacia.Repositories.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer
    (options => options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500")  // Aquí defines el origen permitido
              .AllowAnyMethod()
              .AllowAnyHeader();
        policy.WithOrigins("http://127.0.0.1:5501")  // Aquí defines el origen permitido
             .AllowAnyMethod()
             .AllowAnyHeader();
    });
});

// Add services to the container.

builder.Services.AddDbContext<FarmaciaContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<AbstractRepository<Cliente>, ClienteRepository>();

builder.Services.AddScoped<AbstractRepository<Medicamento>, MedicamentoRepository>();

builder.Services.AddScoped<AbstractRepository<Usuario>, UsuarioRepository>();

builder.Services.AddScoped<AbstractRepository<TipoUsuario>, TipoUsuarioRepository>();

builder.Services.AddScoped<AbstractRepository<Factura>, FacturaRepository>();

builder.Services.AddAuthorization();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("AllowLocalhost");

app.MapControllers();

app.Run();
