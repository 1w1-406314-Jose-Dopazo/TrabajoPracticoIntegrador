using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Implementations;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Implementations;
using Api_Farmacia.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<FarmaciaContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//builder.Services.AddScoped<ITipoUsuarioRepository, TipoUsuarioRepository>();
//builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
//builder.Services.AddScoped<IDetalleFacturaRepository, DetalleFacturaRepository>();
//builder.Services.AddScoped<IFacturaRepository, FacturaRepository>();
builder.Services.AddScoped<IMedicamentoRepository, MedicamentoRepository>();
//builder.Services.AddScoped<ITipoUsuarioService, TipoUsuarioService>();
//builder.Services.AddScoped<IUsuarioService, UsuarioService>();
//builder.Services.AddScoped<IDetalleFacturaService, DetalleFacturaService>();
//builder.Services.AddScoped<IFacturaService, FacturaService>();
builder.Services.AddScoped<IMedicamentoService, MedicamentoService>();

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

app.UseAuthorization();

app.MapControllers();

app.Run();
