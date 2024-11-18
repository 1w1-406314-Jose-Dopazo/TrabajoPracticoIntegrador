using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Api_Farmacia.Data.Models;

public partial class DetalleFactura : Identificable
{
    [Required]
    public int IdMedicamento { get; set; }
    [Required]
    public int IdFactura { get; set; }
    [Required]
    public int Cantidad { get; set; }
    [Required]
    public decimal PrecioUnitario { get; set; }
    [JsonIgnore]
    public virtual Factura IdFacturaNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Medicamento IdMedicamentoNavigation { get; set; } = null!;
}
