﻿using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Models;

namespace Api_Farmacia.Controllers.DTO_s.Factura
{
    public class FacturaPostDto
    {
        public int IdCliente { get; set; }

        public DateTime Fecha { get; set; }

        public ICollection<DetalleFacturaPostDto>? DetallesFacturasDto { get; set; }
    }
}
