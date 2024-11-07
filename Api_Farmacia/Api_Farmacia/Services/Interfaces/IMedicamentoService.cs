using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IMedicamentoService
    {
        List<Medicamento> MedicamentoGetAll();

        Medicamento MedicamentoGetById(int id);

        bool MedicamentoUpdate(Medicamento medicamento);

        bool MedicamentoDelete(int id);

        bool MedicamentoCreate(Medicamento medicamento);
    }
}
