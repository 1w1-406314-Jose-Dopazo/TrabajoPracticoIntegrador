namespace Api_Farmacia.Controllers.DTO_s.Factura
{
    public class FacturaPatchGetDto
    {
        public int Id { get; set; }

        public int? IdCliente { get; set; }

        public DateOnly Fecha { get; set; }

    }
}
