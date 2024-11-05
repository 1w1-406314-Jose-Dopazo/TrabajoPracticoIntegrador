using Api_Farmacia.Models;

namespace Api_Farmacia.Data
{
    public class MedicamentoRepository : IMedicamentoRepository
    {

        FarmaciaContext _context;

        public MedicamentoRepository(FarmaciaContext context)
        {
            _context = context;
        }
        public bool AddOne(Medicamento medicamento)
        {
            try
            {
                _context.Medicamentos.Add(medicamento);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                _context.Dispose();
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                _context.Medicamentos.Remove(GetById(id));
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                _context.Dispose();
                return false;
            }
        }

        public List<Medicamento> GetAll()
        {
           
            return _context.Medicamentos.ToList();
        }

        public Medicamento GetById(int id)
        {
            List<Medicamento> lstM = new List<Medicamento>();
            lstM = _context.Medicamentos.Where(M => M.Id == id).ToList();
            return lstM[0];
        }

        public bool Update(Medicamento medicamento)
        {
            try
            {
                _context.Medicamentos.Update(medicamento);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                _context.Dispose();
                return false;
            }
        }
    }
}
