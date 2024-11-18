using System.ComponentModel.DataAnnotations;

namespace Api_Farmacia.Data.Models
{
    public class Identificable
    {
        [Key]
        public int Id { get; set; }
    }
}
