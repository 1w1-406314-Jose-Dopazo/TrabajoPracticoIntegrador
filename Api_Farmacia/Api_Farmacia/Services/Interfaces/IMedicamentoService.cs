using Api_Farmacia.Controllers.DTO_s.Medicamento;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IMedicamentoService
    {
        List<MedicamentoPatchGetDto> GetAll();

        bool Delete(int id);

        bool LogicDelete(int id);

        MedicamentoPatchGetDto? GetById(int id);

        MedicamentoPatchGetDto? Update(MedicamentoPatchGetDto dtoMedicamento);

        MedicamentoPatchGetDto? Create(MedicamentoPostDto dtoMedicamento);
    }
}
