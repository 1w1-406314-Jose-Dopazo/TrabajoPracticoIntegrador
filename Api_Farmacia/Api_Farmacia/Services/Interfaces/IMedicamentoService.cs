using Api_Farmacia.Controllers.DTO_s.Medicamento;
using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IMedicamentoService
    {
        List<Medicamento> GetAll();
        bool Delete(int id);
        bool LogicDelete(int id);

        Medicamento? GetById(int id);

        bool Update(MedicamentoPutGetDto dtoMedicamento);

        bool Create(MedicamentoPostDto dtoMedicamento);
    }
}
