﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Api_Farmacia.Models;

public partial class Factura
{
    public int Id { get; set; }

    public int IdCliente { get; set; }

    public DateTime Fecha { get; set; }

    public virtual ICollection<DetalleFactura> DetallesFacturas { get; set; } = new List<DetalleFactura>();

    public virtual Cliente IdClienteNavigation { get; set; }
}