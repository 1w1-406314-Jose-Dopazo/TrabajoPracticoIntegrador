using Api_Farmacia.Controllers.DTO_s.Medicamento;
using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;

namespace Api_Farmacia.Services.Implementations
{
    public class MedicamentoService : IMedicamentoService
    {
        private IMedicamentoRepository _medicamentoRepository;

        public MedicamentoService(IMedicamentoRepository repository)
        {
            _medicamentoRepository = repository;
        }

        public MedicamentoPatchGetDto? Create(MedicamentoPostDto dtoMedicamento)
        {
            Medicamento? medicamento = new Medicamento()
            {
                Estado = dtoMedicamento.Estado,
                Nombre = dtoMedicamento.Nombre,
                Descripcion = dtoMedicamento.Descripcion
            };
            medicamento = _medicamentoRepository.Create(medicamento);
            if (medicamento != null)
            {
                return new MedicamentoPatchGetDto()
                {
                    Id = medicamento.Id,
                    Nombre = medicamento.Nombre,
                    Descripcion = medicamento.Descripcion,
                    Estado = medicamento.Estado
                };
            }
            return null;
        }

        public bool Delete(int id)
        {
            return _medicamentoRepository.Delete(id);
        }

        public List<MedicamentoPatchGetDto> GetAll()
        {
            List<Medicamento> medicamentos = _medicamentoRepository.GetAll();
            List<MedicamentoPatchGetDto> medicamentosPatchGetDto = new List<MedicamentoPatchGetDto>();

            foreach (Medicamento medicamento in medicamentos)
            {
                MedicamentoPatchGetDto medicamentoDto = new MedicamentoPatchGetDto()
                {
                    Id = medicamento.Id,
                    Nombre = medicamento.Nombre,
                    Descripcion = medicamento.Descripcion,
                    Estado = medicamento.Estado
                };
                medicamentosPatchGetDto.Add(medicamentoDto);
            }
            return medicamentosPatchGetDto;
        }

        public MedicamentoPatchGetDto? GetById(int id)
        {
            Medicamento? medicamento = _medicamentoRepository.GetById(id);
            return new MedicamentoPatchGetDto()
            {
                Id = medicamento.Id,
                Nombre = medicamento.Nombre,
                Descripcion = medicamento.Descripcion,
                Estado = medicamento.Estado
            };
        }

        public bool LogicDelete(int id)
        {
            return _medicamentoRepository.LogicDelete(id);
        }

        public MedicamentoPatchGetDto? Update(MedicamentoPatchGetDto dtoMedicamento)
        {
            Medicamento? medicamento = new Medicamento()
            {
                Id = dtoMedicamento.Id,
                Estado = dtoMedicamento.Estado,
                Nombre = dtoMedicamento.Nombre,
                Descripcion = dtoMedicamento.Descripcion

            };
            medicamento = _medicamentoRepository.Update(medicamento);
            if (medicamento != null)
            {
                return new MedicamentoPatchGetDto()
                {
                    Id = medicamento.Id,
                    Nombre = medicamento.Nombre,
                    Descripcion = medicamento.Descripcion,
                    Estado = medicamento.Estado
                };
            }
            return null;
        }
    }
}
