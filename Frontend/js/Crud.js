
//#region General

async function Get(url){
    const response = await fetch(url)
    const entities = await response.json()
    return entities;
}

// async function LoadTable(url, containerId){
//     const entities =  await Get(url)
//     const $container = document.getElementById('TableContainer')
//     const table = await CreateTable(entities,url);
//     table.className = "table table-bordered";
//     $container.innerHTML = ''
//     $container.appendChild(table)
// }

// async function CreateTable(entities,url) {
//   console.log(entities);

//   const table = document.createElement("table");
//   const thead = document.createElement("thead");

//   const headers = Object.keys(entities[0]);
//   const titles = headers.map(e=>e.toUpperCase())
//   const headRow = document.createElement("tr");
//   headers.forEach((header) => {
//     const th = document.createElement("th");
//     th.textContent = header.toUpperCase();
//     if(th.textContent === 'ID'){
//       th.style.display = 'none'
//     }
//     headRow.appendChild(th);
//   });
//   th = document.createElement("th");
//   th.textContent = 'Acciones'
//   headRow.appendChild(th);
//   thead.appendChild(headRow);
//   table.appendChild(thead);

//   const tbody = document.createElement("tbody");

//   const dataRows = Object.values(entities);

//   entities.forEach((entity) => {
//     const row = document.createElement("tr");

    const td2 = document.createElement('td');
    
    //grupo botones
    const btnGroup = document.createElement("div")
    btnGroup.className = "btn-group me-2"


    //boton borrar
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-outline-danger';
    btnDelete.type = 'button'
    const iconDelete = document.createElement("i")
    iconDelete.className = 'bi bi-trash'
    btnDelete.appendChild(iconDelete)
    btnDelete.dataset.id = entity.id
    btnDelete.addEventListener('click',async function(){
      const currentId =  btnDelete.dataset.id;
      DeletetEntity(url+'/'+`${currentId}`,url,modalId)

    })
    btnGroup.appendChild(btnDelete)
      //boton actualizar
    const btnUpdate = document.createElement("button")
    btnUpdate.className = 'btn btn-outline-warning';
    btnUpdate.type = "button"
    const iconUpdate = document.createElement("i")
    iconUpdate.className = 'bi bi-pencil-square'
    btnUpdate.appendChild(iconUpdate)
    const id =btnUpdate.dataset.id = entity.id
    const txtId = document.getElementById('txtIdEditar')
    
    btnUpdate.addEventListener('click',function(){
        modal.show()
        txtId.value=id
        
    })
    btnGroup.appendChild(btnUpdate)
    
    td2.appendChild(btnGroup)



    Object.keys(entity).forEach((key, index) => {
      const td = document.createElement("td");
      td.textContent = entity[key];

      if (key === 'id') {
        td.style.display = 'none';
      }

      row.appendChild(td);
      row.appendChild(td2)
    });
    
//     tbody.appendChild(row);
//   });
//   table.appendChild(tbody);
//   return table;
// }





async function SaveEntity(url,obj,methodStr,modalId){
  
  console.log(obj)
  const response = await fetch(url, {
        method: methodStr,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
        credentials: 'same-origin'
        
    })
    if(response.ok){
      setTimeout(() => LoadTable(url,modalId), 1000);
    }
}


async function DeletetEntity(url,url2,modalId){
  
  const response = await  fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
        
    })
    if(response.ok){
      await LoadTable(url2,modalId)
    }
    
}


//#endregion


//#region medicamento
 async function LoadMedicamento(id){
    $medicamento = await Get(`https://localhost:7263/api/Medicamento/${id}`);
    const idInput = document.getElementById('Id');
    const nombreInput = document.getElementById('name');
    const estadoInput = document.getElementById('Estado');
    const descripcionInput = document.getElementById('Medicamento-Description');

    idInput.value = $medicamento.id
    nombreInput.value = $medicamento.nombre
    estadoInput.checked = $medicamento.estado
    descripcionInput.value =$medicamento.descripcion
}

/*
  function CreateMedicamento(){
     const nombreValue = document.getElementById('txtNombreNuevo').value;
     const estadoValue = document.getElementById('chkNuevo').checked;
     const descripcionValue = document.getElementById('txtDescripcionNuevo').value;
     let medicamento = {};
     medicamento.nombre = nombreValue;
     medicamento.estado = estadoValue;
     medicamento.descripcion = descripcionValue;

     return medicamento
}

function EditMedicamento(){

     const id = document.getElementById('txtIdEditar').value;
     const nombreValue = document.getElementById('txtNombreEditar').value;
     const estadoValue = document.getElementById('chkEditar').checked;
     const descripcionValue = document.getElementById('txtDescripcionEditar').value;
     let medicamento = {};
     medicamento.id=id;
     medicamento.nombre = nombreValue;
     medicamento.estado = estadoValue;
     medicamento.descripcion = descripcionValue;

     return medicamento
}*/


//#endregion


//#region DetalleFactura

function CreateDetalleFactura(){
  const idFactura = document.getElementById('ID_Factura_FK').value
  const idMedicamento = document.getElementById('ID_Medicamento').value;
  const cantidad = document.getElementById('txtCantidad').value;
  const precioUnitario = document.getElementById('txtPrecioU').value;
  let detalleFactura = {};
  detalleFactura.idMedicamento = idMedicamento;
  detalleFactura.idFactura=idFactura;
  detalleFactura.cantidad=cantidad;
  detalleFactura.precioUnitario=precioUnitario;

  return detalleFactura
}

function EditarDetalle(){

  const id = document.getElementById('ID').value;
  const idMedicamento = document.getElementById('ID_Medicamento').value;
  const idFactura = document.getElementById('ID_Factura_FK').value;
  const cantidad = document.getElementById('txtCantidad').value;
  const precioUnitario = document.getElementById('txtPrecioU').value;
  let detalle = {};
  detalle.id=id;
  detalle.idMedicamento=idMedicamento;
  detalle.idFactura=idFactura;
  detalle.cantidad=cantidad;
  detalle.precioUnitario=precioUnitario;
  

  return detalle

}

async function LoadDetalle(id){
  
  $detalle = await Get(`https://localhost:7263/api/DetalleFactura/${id}`);
  console.log($detalle)
  const idInput = document.getElementById('ID');
  const idMedicamentoInput = document.getElementById('ID_Medicamento');
  const idFacturaInput = document.getElementById('ID_Factura_FK');
  const cantidadInput = document.getElementById('txtCantidad');
  const precioUnitarioInput = document.getElementById('txtPrecioU');

  idInput.value = $detalle.id
  idMedicamentoInput.value = $detalle.idMedicamento
  idFacturaInput.value = $detalle.idFactura
  cantidadInput.value =$detalle.cantidad
  precioUnitarioInput.value =$detalle.precioUnitario
 
}

//#endregion


//#region Factura
/*
function CreateFactura(){
  const idCliente = document.getElementById('ID_Cliente').value;
  const fecha = document.getElementById('Fecha').value;
  let LstDetalle[detalles] = document.getElementById('Fecha').value;
  let factura = {};
  factura.idCliente=idCliente;
  factura.fecha=fecha;
  factura.detalle = LstDetalle[detalles]

  return factura
}
/*

/*
function EditFactura(){
  const id = document.getElementById('ID_Factura').value;
  const idCliente = document.getElementById('ID_Cliente').value;
  const fecha = document.getElementById('Fecha').value;
  let LstDetalle[detalles] = document.getElementById('Fecha').value;
  let factura = {};
  factura.id=id;
  factura.idCliente = idCliente;
  factura.fecha = fecha;
  factura.detalle = LstDetalle[detalles]

  return factura
}

function AddDetalle(id,detallea){
  const factura = await Get(`https://localhost:7263/api/Factura/Factura/${id}`);
  factura.LstDetalle[detalle].push(detallea)
}

function RemoveDetalle(id,idDetallea){
  const factura = await Get(`https://localhost:7263/api/Factura/Factura/${id}`);
  actura.LstDetalle[detalle].filter(await Get(`https://localhost:7263/api/DetalleFactura/Detalle_Factura/${detallea.id}`));
}

async function LoadFactura(id){
  $factura = await Get(`https://localhost:7263/api/Factura/Factura/${id}`);
  console.log($factura)
  const idInput = document.getElementById('ID_Factura');
  const idClienteInput = document.getElementById('ID_Cliente');
  const FechaInput = document.getElementById('Fecha');

  idInput.value = $factura.id
  idClienteInput.value = $factura.idCliente
  FechaInput.value = $factura.fecha
}
  */
//#endregion

  
