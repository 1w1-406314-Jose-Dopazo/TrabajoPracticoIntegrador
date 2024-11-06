using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;

namespace Api_Farmacia.Services
{
    public class FarmaciaService : IFarmaciaService
    {
        IDetalleFacturaRepository _Detalle_Factura_Repository;
        ITipoUsuarioRepository _Tipo_Usuario_Repository;
        IFacturaRepository _Factura_Repository;
        IUsuarioRepository _Usuario_Repository;
        IMedicamentoRepository _Medicamento_Repository;

        public FarmaciaService(IDetalleFacturaRepository dfr,ITipoUsuarioRepository tur,IFacturaRepository fr,IUsuarioRepository ur,IMedicamentoRepository mr)
        {
            _Detalle_Factura_Repository = dfr;
            _Tipo_Usuario_Repository = tur;
            _Factura_Repository = fr;
            _Usuario_Repository = ur;
            _Medicamento_Repository = mr;
                
        }

        #region DetalleFactura
        public bool DetalleFacturaAddOne(DetalleFactura detalle, Medicamento medicamento)
        {
            try
            {
                _Detalle_Factura_Repository.AddOne(detalle, medicamento);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool DetalleFacturaDelete(int id)
        {
            try
            {
                _Detalle_Factura_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<DetalleFactura> DetalleFacturaGetAll()
        {
            return _Detalle_Factura_Repository.GetAll();
        }

        public DetalleFactura DetalleFacturatGetById(int id)
        {
            return _Detalle_Factura_Repository.GetById(id);
        }

        public bool DetalleFacturaUpdate(DetalleFactura detalleFactura)
        {
            try
            {
                return _Detalle_Factura_Repository.Update(detalleFactura);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        #endregion

        #region Factura
        public bool FacturaAddDetail(Factura factura, DetalleFactura detalle)
        {
            try
            {
                _Factura_Repository.AddDetail(factura, detalle);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool FacturaAddOne(Factura factura, List<DetalleFactura> detalles)
        {
            try
            {
                _Factura_Repository.AddOne(factura, detalles);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool FacturaDelete(int id)
        {
            try
            {
                _Factura_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<Factura> FacturaGetAll()
        {
            return _Factura_Repository.GetAll();
        }

        public Factura FacturaGetById(int id)
        {
            return _Factura_Repository.GetById(id);
        }

        public bool FacturaUpdate(Factura factura)
        {
            try
            {
                _Factura_Repository.Update(factura);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        #endregion

        #region Medicamento
        public bool MedicamentoAddOne(Medicamento medicamento)
        {
            try
            {
                _Medicamento_Repository.AddOne(medicamento);
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

        #endregion

        #region TipoUsuario
        public bool TipoUsuarioAddOne(TipoUsuario tipoUsuario)
        {
            try
            {
                _Tipo_Usuario_Repository.AddOne(tipoUsuario);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool TipoUsuarioDelete(int id)
        {
            try
            {
                _Tipo_Usuario_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<TipoUsuario> TipoUsuarioGetAll()
        {
            return _Tipo_Usuario_Repository.GetAll();
        }

        public TipoUsuario TipoUsuarioGetById(int id)
        {
            return _Tipo_Usuario_Repository.GetById(id);
        }

        public bool TipoUsuarioUpdate(TipoUsuario tipoUsuario)
        {
            try
            {
                _Tipo_Usuario_Repository.Update(tipoUsuario);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        #endregion

        #region Usuario
        public bool UsuarioAddOne(Usuario usuario, TipoUsuario tipoUsuario)
        {
            try
            {
                _Usuario_Repository.AddOne(usuario, tipoUsuario);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool UsuarioDelete(int id)
        {
            try
            {
                _Usuario_Repository.Delete(id);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<Usuario> UsuarioGetAll()
        {
            return _Usuario_Repository.GetAll();
        }

        public Usuario UsuarioGetById(int id)
        {
            return _Usuario_Repository.GetById(id);
        }

        public bool UsuarioUpdate(Usuario usuario)
        {
            try
            {
                _Usuario_Repository.Update(usuario);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        #endregion
    }
}
