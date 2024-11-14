﻿using Api_Farmacia.Controllers.DTO_s.DetalleFactura;
using Api_Farmacia.Models;

namespace Api_Farmacia.Services.Interfaces
{
    public interface IDetalleFacturaService
    {
        List<DetalleFacturaPatchGetDto> DetalleFacturaGetAll();

        DetalleFacturaPatchGetDto DetalleFacturatGetById(int id);

        bool DetalleFacturaUpdate(DetalleFacturaPatchGetDto dto);

        bool DetalleFacturaDelete(int id);

        bool DetalleFacturaCreate(DetalleFacturaPostDto dto);
    }
}
