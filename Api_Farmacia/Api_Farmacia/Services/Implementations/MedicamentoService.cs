using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class MedicamentoService : IMedicamentoService
    {
        private IMedicamentoRepository _medicamento_repository;

        public MedicamentoService(IMedicamentoRepository repository)
        {
            _medicamento_repository = repository;
        }

        public bool Create(Medicamento medicamento)
        {
            return _medicamento_repository.Create(medicamento);
        }

        public bool Delete(int id)
        {
            return _medicamento_repository.Delete(id);
        }

        public List<Medicamento> GetAll()
        {
            return _medicamento_repository.GetAll();
        }

        public Medicamento? GetById(int id)
        {
            return _medicamento_repository.GetById(id);
        }

        public bool LogicDelete(int id)
        {
            return _medicamento_repository.LogicDelete(id);
        }

        public bool Update(Medicamento medicamento)
        {
            return _medicamento_repository.Update(medicamento);
        }
    }
}
