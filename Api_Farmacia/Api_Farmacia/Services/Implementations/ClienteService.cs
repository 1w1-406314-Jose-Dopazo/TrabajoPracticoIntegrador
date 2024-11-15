using Api_Farmacia.Controllers.DTO_s.Cliente;
using Api_Farmacia.Controllers.DTO_s.Medicamento;
using Api_Farmacia.Models;
using Api_Farmacia.Repositories.Implementations;
using Api_Farmacia.Repositories.Interfaces;
using Api_Farmacia.Services.Interfaces;
using System.Data.SqlClient;

namespace Api_Farmacia.Services.Implementations
{
    public class ClienteService : IClienteService
    {
        private IClienteRepository _repository;

        public ClienteService(IClienteRepository repository)
        {
            _repository = repository;
        }

        public ClientePatchGetDto? Create(ClientePostDto clientePostDto)
        {
            Cliente? cliente = new Cliente()
            {
                Nombre = clientePostDto.Nombre,
                Apellido = clientePostDto.Apellido,
                Telefono = clientePostDto.Telefono,
            };
            cliente = _repository.Create(cliente);
            if (cliente != null)
            {
                return new ClientePatchGetDto()
                {
                    Id = cliente.Id,
                    Nombre = cliente.Nombre,
                    Apellido = cliente.Apellido,
                    Telefono = cliente.Telefono
                };
            }
            return null;
        }

        public bool Delete(int id)
        {
            return _repository.Delete(id);
        }

        public List<ClientePatchGetDto> GetAll()
        {
            List<Cliente> clientes = _repository.GetAll();
            List<ClientePatchGetDto> clientesPatchGetDto = new List<ClientePatchGetDto>();

            foreach (Cliente cliente in clientes)
            {
                ClientePatchGetDto clientePatchGetDto = new ClientePatchGetDto()
                {
                    Id = cliente.Id,
                    Nombre = cliente.Nombre,
                    Apellido = cliente.Apellido,
                    Telefono = cliente.Telefono
                };
                clientesPatchGetDto.Add(clientePatchGetDto);
            }
            return clientesPatchGetDto;
        }

        public ClientePatchGetDto? GetById(int id)
        {
            Cliente? cliente = _repository.GetById(id);
            return new ClientePatchGetDto()
            {
                Id = cliente.Id,
                Nombre = cliente.Nombre,
                Apellido = cliente.Apellido,
                Telefono = cliente.Telefono
            };
        }

        public ClientePatchGetDto? Update(ClientePatchGetDto clientePatchGetDto)
        {
            Cliente? cliente = new Cliente()
            {
                Id = clientePatchGetDto.Id,
                Nombre = clientePatchGetDto.Nombre,
                Apellido = clientePatchGetDto.Apellido,
                Telefono = clientePatchGetDto.Telefono
            };
            cliente = _repository.Update(cliente);
            if (cliente!= null)
            {
                return new ClientePatchGetDto()
                {
                    Id = clientePatchGetDto.Id,
                    Nombre = clientePatchGetDto.Nombre,
                    Apellido = clientePatchGetDto.Apellido,
                    Telefono = clientePatchGetDto.Telefono
                };
            }
            return null;
        }
    }
}
