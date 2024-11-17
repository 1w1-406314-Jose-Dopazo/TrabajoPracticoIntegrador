using System.Text.Json.Serialization;

namespace Api_Farmacia.Data.Models;

public partial class TipoUsuario : Identificable
{
    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
