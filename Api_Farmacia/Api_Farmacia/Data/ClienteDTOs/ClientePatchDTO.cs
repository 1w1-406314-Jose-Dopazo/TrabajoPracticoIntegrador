﻿using Api_Farmacia.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Api_Farmacia.Data.ClienteDTOs
{
    public class ClientePatchDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "El nombre   no debe superar los 100 caracteres")]
        public string Nombre { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "El apellido no debe superar los 100 caracteres")]
        public string Apellido { get; set; }
        [Phone(ErrorMessage = "El telefono debe estar en un formato valido")]
        [MaxLength(15, ErrorMessage = "El numero de telefono debe tener menos de 16 digitos")]
        [MinLength(7, ErrorMessage = "El numero de telefono debe tener mas de 6 digitos")]
        public string? Telefono { get; set; }

        public Cliente toCliente()
        {
            return new Cliente()
            {
                Id = Id,
                Nombre = Nombre,
                Apellido = Apellido,
                Telefono = Telefono
            };
        }
    }
}