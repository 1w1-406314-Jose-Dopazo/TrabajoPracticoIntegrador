using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;

namespace Api_Farmacia.Repositories.Implementations
{
    public class MedicamentoRepository : IMedicamentoRepository
    {
        private FarmaciaContext _context;

        public MedicamentoRepository(FarmaciaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Devuelve todos los medicamentos de la base de datos
        /// </summary>
        /// <returns>List<Medicamento></returns>
        public List<Medicamento> GetAll()
        {
            try
            {
                return _context.Medicamentos.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Elimina el medicamento de la base de datos
        /// </summary>
        /// <param name="id">id del medicamento a borrar</param>
        /// <returns>Bool que indica si se eliminó exitosamente</returns>
        public bool Delete(int id)
        {
            try
            {
                Medicamento? medicamento = _context.Medicamentos.Find(id);
                if (medicamento == null)
                {
                    return false;
                }
                _context.Medicamentos.Remove(medicamento);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Hace un borrado LOGICO del medicamento seteando su estado a false
        /// </summary>
        /// <param name="id">id del medicamento a borrar</param>
        /// <returns>Bool que indica si se cambió el estado del medicamento a false</returns>
        public bool LogicDelete(int id)
        {
            try
            {
                Medicamento? medicamento = _context.Medicamentos.Find(id);
                if (medicamento == null || medicamento.estado == true)
                {
                    return false;
                }
                medicamento.estado = false;
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Create(Medicamento medicamento)
        {
            try
            {
                _context.Medicamentos.Add(medicamento);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }



        public Medicamento? GetById(int id)
        {
            try
            {
                return _context.Medicamentos.Find(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Update(Medicamento medicamento)
        {
            try
            {
                Medicamento? medicamentoDb = _context.Medicamentos.FirstOrDefault(m => m.Id == medicamento.Id);
                if (medicamentoDb != null)
                {
                    medicamentoDb = medicamento;
                }
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
