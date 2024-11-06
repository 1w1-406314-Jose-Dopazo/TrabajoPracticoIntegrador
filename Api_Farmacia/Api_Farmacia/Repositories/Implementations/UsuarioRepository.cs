using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;

namespace Api_Farmacia.Repositories.Implementations
{
    public class UsuarioRepository : IUsuarioRepository
    {
        FarmaciaContext _context;

        public UsuarioRepository(FarmaciaContext context)
        {
            _context = context;
        }
        public bool AddOne(Usuario usuario, TipoUsuario tipoUsuario)
        {
            try
            {
                usuario.IdTipoUsuario = tipoUsuario.Id;
                _context.Usuarios.Add(usuario);
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
                _context.Usuarios.Remove(GetById(id));
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                _context.Dispose();
                return false;
            }
        }

        public List<Usuario> GetAll()
        {
            return _context.Usuarios.ToList();
        }

        public Usuario GetById(int id)
        {
            List<Usuario> lstU = new List<Usuario>();
            lstU = _context.Usuarios.Where(u => u.Id == id).ToList();
            return lstU[0];
        }

        public bool Update(Usuario usuario)
        {
            try
            {
                _context.Usuarios.Update(usuario);
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
