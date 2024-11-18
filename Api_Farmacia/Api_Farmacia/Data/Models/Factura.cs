using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Api_Farmacia.Data.Models;

public partial class Factura : Identificable
{
    [Required]
    public int? IdCliente { get; set; }
    [DataType(DataType.DateTime)]
    public DateTime Fecha { get; set; }
    
    public virtual ICollection<DetalleFactura> DetallesFacturas { get; set; } = new List<DetalleFactura>();
    [JsonIgnore]
    public virtual Cliente? IdClienteNavigation { get; set; }
}
