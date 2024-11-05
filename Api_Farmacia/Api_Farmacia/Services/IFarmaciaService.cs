using Api_Farmacia.Models;

namespace Api_Farmacia.Services
{
    public interface IFarmaciaService
    {

        #region Usuario
        List<Usuario> UsuarioGetAll();

        Usuario UsuarioGetById(int id);

        bool UsuarioUpdate(Usuario usuario);

        bool UsuarioDelete(int id);

        bool UsuarioAddOne(Usuario usuario, TipoUsuario tipoUsuario);
        #endregion

        #region TipoUsuario

        List<TipoUsuario> TipoUsuarioGetAll();

        TipoUsuario TipoUsuarioGetById(int id);

        bool TipoUsuarioUpdate(TipoUsuario tipoUsuario);

        bool TipoUsuarioDelete(int id);

        bool TipoUsuarioAddOne(TipoUsuario tipoUsuario);

        #endregion

        #region Medicamento
        List<Medicamento> MedicamentoGetAll();

        Medicamento MedicamentoGetById(int id);

        bool MedicamentoUpdate(Medicamento medicamento);

        bool MedicamentoDelete(int id);

        bool MedicamentoAddOne(Medicamento medicamento);
        #endregion

        #region Factura
        List<Factura> FacturaGetAll();

        Factura FacturaGetById(int id);

        bool FacturaUpdate(Factura factura);

        bool FacturaDelete(int id);

        bool FacturaAddOne(Factura factura, List<DetalleFactura> detalles);

        bool FacturaAddDetail(Factura factura, DetalleFactura detalle);

        #endregion

        #region DetalleFactura
        List<DetalleFactura> DetalleFacturaGetAll();

        DetalleFactura DetalleFacturatGetById(int id);

        bool DetalleFacturaUpdate(DetalleFactura detalleFactura);

        bool DetalleFacturaDelete(int id);

        bool DetalleFacturaAddOne(DetalleFactura detalle, Medicamento medicamento);

        #endregion
    }
}
