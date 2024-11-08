﻿using Api_Farmacia.Models;
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
                Medicamento? medicamento = GetById(id);
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
                Medicamento? medicamento = GetById(id);
                if (medicamento == null)
                {
                    return false;
                }
                medicamento.Estado = false;
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Agrega un medicamento a la base de datos
        /// </summary>
        /// <param name="medicamento">Medicamento a agregar</param>
        /// <returns>True si se agregó, false si no</returns>
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

        /// <summary>
        /// Busca un medicamento por su id
        /// </summary>
        /// <param name="id">id del medicamento a buscar</param>
        /// <returns>La entidad medicamento encontrada o null</returns>
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

        /// <summary>
        /// Actualiza los valores de un medicamento si este existe.
        /// </summary>
        /// <param name="medicamento">Medicamento con los nuevos valores</param>
        /// <returns>True si se actualizó, false si no</returns>
        public bool Update(Medicamento medicamento)
        {
            try
            {
                Medicamento? medicamentoDb = GetById(medicamento.Id); //Uso el metodo GetById en lugar de llamar al context.
                //Medicamento? medicamentoDb = _context.Medicamentos.FirstOrDefault(m => m.Id == medicamento.Id); //FirstOrDefault no busca en la base de datos si lo encuentra ya en el context local.
                if (medicamentoDb == null)
                {
                    return false;
                }
                medicamentoDb.Nombre = medicamento.Nombre;
                medicamentoDb.Descripcion = medicamento.Descripcion;
                medicamentoDb.Estado = medicamento.Estado;
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
