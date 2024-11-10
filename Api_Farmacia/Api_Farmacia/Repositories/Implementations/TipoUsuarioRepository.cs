using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;

namespace Api_Farmacia.Repositories.Implementations
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        private FarmaciaContext _context;
        public TipoUsuarioRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public bool Create(TipoUsuario tipoUsuario)
        {
            try
            {
                _context.TiposUsuarios.Add(tipoUsuario);
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
                _context.TiposUsuarios.Remove(GetById(id));
                _context.SaveChanges();
                return true;

            }
            catch (Exception)
            {

                _context.Dispose();
                return false;
            }
        }

        public List<TipoUsuario> GetAll()
        {
            return _context.TiposUsuarios.ToList();

        }

        public TipoUsuario GetById(int id)
        {

            List<TipoUsuario> lstU = _context.TiposUsuarios.Where(t => t.Id == id).ToList();
            return lstU[0];

        }

        public bool Update(TipoUsuario tipoUsuario)
        {
            try
            {
                _context.TiposUsuarios.Update(tipoUsuario);
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
