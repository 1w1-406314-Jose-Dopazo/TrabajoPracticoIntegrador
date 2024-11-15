using Api_Farmacia.Controllers.DTO_s.Cliente;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IClienteService
    {
        List<ClientePatchGetDto> GetAll();

        bool Delete(int id);

        ClientePatchGetDto? GetById(int id);

        ClientePatchGetDto? Update(ClientePatchGetDto clientePatchGetDto);

        ClientePatchGetDto? Create(ClientePostDto clientePostDto);
    }
}
