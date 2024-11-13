namespace Api_Farmacia.Controllers.DTO_s.Medicamento
{
    public class MedicamentoPutDto
    {
        public int Id { get; set; }

        public bool Estado { get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }
    }
}
