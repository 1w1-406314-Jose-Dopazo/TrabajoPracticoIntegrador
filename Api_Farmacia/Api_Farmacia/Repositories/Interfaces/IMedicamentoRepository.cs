using Api_Farmacia.Models;

namespace Api_Farmacia.Repositories.Interfaces
{
    public interface IMedicamentoRepository
    {
        List<Medicamento> GetAll();
        bool Delete(int id);
        bool LogicDelete(int id);

        Medicamento GetById(int id);

        bool Update(Medicamento medicamento);

        bool Create(Medicamento medicamento);
    }
}
