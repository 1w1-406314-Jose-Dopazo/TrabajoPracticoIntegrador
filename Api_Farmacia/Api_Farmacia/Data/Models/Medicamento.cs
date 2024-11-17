using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Api_Farmacia.Data.Models;

public partial class Medicamento : Identificable
{
    public string Nombre { get; set; } = null!;

    public bool Estado { get; set; }

    public string? Descripcion { get; set; }

    public decimal PrecioUnitario { get; set; }
    [JsonIgnore]
    public virtual ICollection<DetalleFactura> DetallesFacturas { get; set; } = new List<DetalleFactura>();
}
