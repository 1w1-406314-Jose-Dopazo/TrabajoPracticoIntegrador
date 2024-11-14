namespace Api_Farmacia.Controllers.DTO_s.DetalleFactura
{
    public class DetalleFacturaPatchGetDto
    {

        public int Id { get; set; }

        public int IdMedicamento { get; set; }

        public int IdFactura { get; set; }

        public int Cantidad { get; set; }

        public decimal PrecioUnitario { get; set; }
    }
}
