using Api_Farmacia.Models;

namespace Api_Farmacia.Data
{
    public interface IMedicamentoRepository
    {
        List<Medicamento> GetAll();

        Medicamento GetById(int id);

        bool Update(Medicamento medicamento);

        bool Delete(int id);

        bool AddOne(Medicamento medicamento);
    }
}
