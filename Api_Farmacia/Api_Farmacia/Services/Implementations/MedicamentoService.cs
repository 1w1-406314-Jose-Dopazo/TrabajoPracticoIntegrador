using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class MedicamentoService : IMedicamentoService
    {
        IMedicamentoRepository _Medicamento_Repository;

        public MedicamentoService(IMedicamentoRepository mr)
        {

            _Medicamento_Repository = mr;
        }
        public bool MedicamentoCreate(Medicamento medicamento)
        {
            try
            {
                _Medicamento_Repository.Create(medicamento);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool MedicamentoDelete(int id)
        {
            try
            {
                _Medicamento_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<Medicamento> MedicamentoGetAll()
        {
            return _Medicamento_Repository.GetAll();

        }

        public Medicamento MedicamentoGetById(int id)
        {
            return _Medicamento_Repository.GetById(id);
        }

        public bool MedicamentoUpdate(Medicamento medicamento)
        {
            try
            {
                _Medicamento_Repository.Update(medicamento);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
