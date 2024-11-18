using Api_Farmacia.Data;
using Api_Farmacia.Data.Models;

namespace Api_Farmacia.Repositories.Implementations
{
    public class MedicamentoRepository : AbstractRepository<Medicamento>
    {
        public MedicamentoRepository(FarmaciaContext context) : base(context)
        {
        }

        public override async Task<Medicamento?> Update(Medicamento entidad)
        {
            Medicamento? medicamentoExistente = await GetById(entidad.Id);
            if (medicamentoExistente is not null)
            {
                medicamentoExistente.Nombre = entidad.Nombre;
                medicamentoExistente.Estado = entidad.Estado;
                medicamentoExistente.Descripcion = entidad.Descripcion;
                medicamentoExistente.PrecioUnitario = entidad.PrecioUnitario;

                await _context.SaveChangesAsync();
            }
            //si existe devuelve la entidad, sino null
            return await GetById(entidad.Id);
        }
    }
}
