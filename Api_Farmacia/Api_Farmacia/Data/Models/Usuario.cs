using System.Text.Json.Serialization;

namespace Api_Farmacia.Data.Models;

public partial class Usuario : Identificable
{
    public string Nombre { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public int IdTipoUsuario { get; set; }
    [JsonIgnore]
    public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; } = null!;
}
