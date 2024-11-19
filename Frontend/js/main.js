// const localhost = "https://localhost:7263/api/";
//#region forms


function GetComboClientesIndex(nombreCompleto) {
  const dropdown = document.getElementById('comboClientesEditar');
  
  if (!dropdown) {
      console.error(`Dropdown con ID '${dropdownId}' no encontrado.`);
      return -1;
  }

  for (let i = 0; i < dropdown.options.length; i++) {
      if (dropdown.options[i].text === nombreCompleto) {
          return i; 
      }
  }
  return -1;
}


let lstClientes = [];
async function LoadComboClientes(idComboC){
  lstClientes = []
  await fetch("https://localhost:7263/api/cliente")
  .then(respones => respones.json())
  .then(clientes => {
    const selectCliente = document.getElementById(idComboC)
    selectCliente.innerHTML = ""
    clientes.forEach(cliente => {
      const option = document.createElement("option")
      option.value = cliente.id
      option.text = cliente.nombre + " " + cliente.apellido
      selectCliente.appendChild(option)
      lstClientes.push(cliente)
    });
    
  })
  
  console.log(lstClientes)
  
}

let lstMedicamentos = [];
function LoadComboMedicamentos(idComboM) {
  
  lstMedicamentos = []
fetch("https://localhost:7263/api/medicamento")
  .then((respones) => respones.json())
  .then((medicamentos) => {
    const selectCliente = document.getElementById(idComboM);
    selectCliente.innerHTML = "";
    medicamentos.forEach((medicamento) => {
      if (medicamento.estado) {
        const option = document.createElement("option");
        option.value = medicamento.id;
        option.text = medicamento.nombre;
        selectCliente.appendChild(option);
        lstMedicamentos.push(medicamento)
        
      }
    });
  });
  console.log(lstMedicamentos)
}

let lstTiposUsuarios = [];
function LoadComboTiposUsuarios(idComboT){
  fetch("https://localhost:7263/api/TipoUsuario")
  .then((respones) => respones.json())
  .then((tiposUsuarios) => {
    const selectTipoUsuario = document.getElementById(idComboT);
    selectTipoUsuario.innerHTML = "";
    tiposUsuarios.forEach((tipoUsuario) => {
      
        const option = document.createElement("option");
        option.value = tipoUsuario.id;
        option.text = tipoUsuario.nombre;
        selectTipoUsuario.appendChild(option);
        lstTiposUsuarios.push(tipoUsuario)
        
      
    });
  });
  console.log(lstMedicamentos)
}

async function LoadModalEditarFactura(nombre,apellido){
  const nombreCompleto = nombre+" "+apellido
  await LoadComboClientes("comboClientesEditar")
  await LoadComboMedicamentos("comboMedicamentosEditar")
  document.getElementById("editar-facturaFecha").value = new Date().toLocaleDateString()
  document.getElementById("comboClientesEditar").selectedIndex = GetComboClientesIndex(nombreCompleto)

}

function LoadModalNuevaFactura(){
  lstDetallesLocal =[]
  LoadComboClientes("comboClientes")
  LoadComboMedicamentos("comboMedicamentos")
  document.getElementById("nueva-facturaFecha").value = new Date().toLocaleDateString()
  
  
   fecha = document.getElementById("nueva-facturaFecha").value

   fecha = new Date().toISOString()
   
  console.log(fecha)
}

function LoadModalTipoUsuario(cboId){
  lstTiposUsuarios =[]
  LoadComboTiposUsuarios(cboId)
}


//#endregion

//#region tablas

async function DeleteEntityById(url, id) {
const response = await fetch(url + id);
return await response.json();
}
function LoadMedicamentos() {
fetch("https://localhost:7263/api/Medicamento")
  .then((response) => response.json())
  .then((medicamentos) => {
    const tbody = document.getElementById("tbody-medicamentos");
    tbody.innerHTML = ""; // Limpiar la tabla

    const modalEditarMedicamento = new bootstrap.Modal(document.getElementById('editar-medicamento-modal'))

    const idInput = document.getElementById('editar-medicamentoId')
    const nombreInput=document.getElementById('editar-medicamentoNombre')
    const descripcionInput=document.getElementById('editar-medicamentoDescripcion')
    const estadoInput=document.getElementById('editar-medicamentoEstado')

    medicamentos.forEach((medicamento) => {
      const row = document.createElement("tr");
      
      row.innerHTML = `
      <td class="text-center">${medicamento.nombre}</td>
      <td class="text-center">${medicamento.descripcion}</td>
      <td class="text-center">${medicamento.estado ? "Activo" : "Inactivo"}</td>
      <td class="text-center">
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-outline-warning edit-btn" data-bs-toggle="modal" data-bs-target="#editar-medicamento-modal">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-outline-danger delete-btn ${medicamento.estado ? '' : 'd-none'}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    `;

      // Agregar el evento para el botón de editar
      row.querySelector(".edit-btn").addEventListener("click", function(){
        modalEditarMedicamento.show()
        console.log("Botón de editar presionado para:", medicamento);
        idInput.value = medicamento.id
        nombreInput.value = medicamento.nombre
        descripcionInput.value = medicamento.descripcion
        estadoInput.checked = medicamento.estado
        // Mostrar modal
      });
      
      // Agregar el evento para el botón de eliminar
      row.querySelector(".delete-btn").addEventListener("click", function(){
        DeleteMedicamento(medicamento.id);
        console.log("Botón de eliminar presionado para:", medicamento);
        // Eliminar medicamento
      });

      tbody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error al cargar medicamentos:", error));
}


let lstDetallesLocal =[];
function AgregarDetalle(idComboM, idDetCant, idDetPre, tbody) {
  idTbody = tbody;
  const medicamento = document.getElementById(idComboM);
  const medicamentoId = medicamento.value;
  const medicamentoNombre = medicamento.options[medicamento.selectedIndex].text;
  const cantidad = parseInt(document.getElementById(idDetCant).value, 10);
  const precio = parseFloat(document.getElementById(idDetPre).value);
  
  console.log(medicamentoId + " " + medicamentoNombre + " " + cantidad + " " + precio);
  
  if (cantidad > 0) {
    const tbody = document.getElementById(idTbody);
    let existingRow = null;
    // esto de acá funciona generando un array a partir de las filas del tbody (vale oro)
    Array.from(tbody.rows).forEach(row => {
      const rowMedicamentoId = row.cells[0].textContent.trim();
      if (rowMedicamentoId === medicamentoId) {
        existingRow = row;
      }
    });
    
    if (existingRow) {
      const currentQuantity = parseInt(existingRow.cells[2].textContent.trim(), 10);
          const newQuantity = currentQuantity + cantidad;
          existingRow.cells[2].textContent = newQuantity;
          
      } else {
        lstDetallesLocal.push({
              "idMedicamento": medicamentoId,
              "cantidad": cantidad,
              "precioUnitario": precio
            });
            
            const row = document.createElement("tr");
            row.className = "text-center";
            row.innerHTML = `
              <td class="d-none">${medicamentoId}</td>
              <td>${medicamentoNombre}</td>
              <td>${cantidad}</td>
              <td>${precio}</td>
              <td>
                  <button class="btn btn-outline-danger delete-btn">
                      <i class="bi bi-trash"></i>
                      </button>
                      </td>
                      `;
                      tbody.appendChild(row);
                      
                      row.querySelector(".delete-btn").addEventListener('click', () => {
              row.remove();
          });
      }
    }
}

function LimpiarDetalles(){
    lstDetallesLocal = []
}
async function LoadFacturas() {
  const response = await fetch("https://localhost:7263/api/Factura");
  const facturas = await response.json();
      const tbody = document.getElementById("tbody-facturas");
      const idInput = document.getElementById('editar-facturaId')
      tbody.innerHTML = ""; // Limpiar la tabla
      
      const modalEditarFactura = new bootstrap.Modal(document.getElementById('editar-factura-modal'))
      const modalInfoFactura = new bootstrap.Modal(document.getElementById('info-factura-modal'))
      
      for (const factura of facturas) {
        const row = document.createElement("tr");
        const responseCliente = await fetch(`https://localhost:7263/api/Cliente/${factura.idCliente}`)
        const cliente = await responseCliente.json()
        var fechaParseada = factura.fecha
        fechaParseada = new Date().toLocaleDateString() 
        row.innerHTML = `
          <td class="d-none">${factura.id}</td>
          <td  style="text-align: center;">${cliente.nombre + " " + cliente.apellido}</td>
          <td class="text-center">${fechaParseada}</td>
          <td class="text-center">
            <div class="btn-group me-2">
              <button type="button" class="btn btn-outline-warning edit-btn" data-bs-toggle="modal" data-bs-target="#editar-factura-modal">
                <i class="bi bi-pencil"></i>
              </button>
              <button type="button" class="btn btn-outline-warning info-btn" data-bs-toggle="modal" data-bs-target="#info-factura-modal">
                <i class="bi bi-info-lg"></i>
              </button>
              <button class="btn btn-outline-danger delete-btn">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        `;

        // Agregar el evento para el botón de editar
        row.querySelector(".edit-btn").addEventListener("click", function(){
          LoadModalEditarFactura(cliente.nombre,cliente.apellido)
          idInput.value = factura.id
          LoadDetallesFactura(factura.id)
          modalEditarFactura.show()
            onclick = "LoadComboClientes()"
            onclick = "LoadComboMedicamentos()"
            document.getElementById("comboClientes").selected = factura.cliente
          console.log("Botón de editar presionado para:", factura);
          // Mostrar modal
        });

        // Agregar el evento para el boton de informacion de factura
        row.querySelector(".info-btn").addEventListener("click", function(){
          modalInfoFactura.show()
          LoadDetallesFacturaInfo(factura.id)
        console.log("Botón de info presionado para:", factura);
        // Mostrar modal
      });
        
        // Agregar el evento para el botón de eliminar
        row.querySelector(".delete-btn").addEventListener("click", function(){
          DeleteFactura(factura.id);
          console.log("Botón de eliminar presionado para:", factura);
          // Eliminar medicamento
        });

        tbody.appendChild(row);
      };
    }

    async function LoadDetallesFacturaInfo(id) {
      await fetch("https://localhost:7263/api/Factura/" + id)
        .then((response) => response.json())
        .then(async (Factura) => {
          const tbody = document.getElementById("tbody-detallesFacturaInfo");
          tbody.innerHTML = ""; // Limpiar la tabla
          

          for (const detalleFactura of Factura.detallesFacturas) {
            const row = document.createElement("tr");
            row.className = "text-center";

            const medicamento = await fetch(
              `https://localhost:7263/api/Medicamento/${detalleFactura.idMedicamento}`
            ).then((response) => response.json());

            row.innerHTML = `
                    <tr>
                      <td class="d-none">${medicamento.id}</td>
                      <td>${medicamento.nombre}</td>
                      <td>${detalleFactura.cantidad}</td>
                      <td>${detalleFactura.precioUnitario}</td>
                    <tr>
                      `;
            tbody.appendChild(row);
          }
        })
        .catch((error) => console.error("Error al cargar medicamentos:", error));
    }

    async function LoadDetallesFactura(id) {
      await fetch("https://localhost:7263/api/Factura/" + id)
        .then((response) => response.json())
        .then(async (factura) => {
          const tbody = document.getElementById("tbody-detallesFacturaEditar");
          tbody.innerHTML = ""; // Limpiar la tabla
          
    
          for (const detalleFactura of factura.detallesFacturas) {
            const row = document.createElement("tr");
            row.className = "text-center";
            const medicamento = await fetch(
              `https://localhost:7263/api/Medicamento/${detalleFactura.idMedicamento}`
            ).then((response) => response.json());

            row.innerHTML = `
                    <tr>
                      <td class="d-none">${medicamento.id}</td>
                      <td>${medicamento.nombre}</td>
                      <td>${detalleFactura.cantidad}</td>
                      <td>${detalleFactura.precioUnitario}</td>
                      <td class="text-center">
                        <div class="btn-group me-2">
                          <button class="btn btn-outline-danger delete-btn">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                      </tr>
                      `;
            tbody.appendChild(row);
            // Agregar el evento para el botón de eliminar
            row.querySelector(".delete-btn").addEventListener("click", () => {
              row.remove();
            });
          }
        })
        .catch((error) => console.error("Error al cargar medicamentos:", error));
    }
    


async function LoadClientes() {
  const tbody = document.getElementById("tbody-Clientes");
  const idInput = document.getElementById('editar-cliente-Id')
  const nombreInput = document.getElementById('editar-clienteNombre')
  const apellidoInput = document.getElementById('editar-clienteApellido')
  const telefonoInput = document.getElementById('editar-cliente-numero')
fetch("https://localhost:7263/api/Cliente")
  .then((response) => response.json())
  .then(async(clientes) => {
    tbody.innerHTML = ""; // Limpiar la tabla

    clientes.forEach((cliente) => {
      console.log(cliente)
      const row = document.createElement("tr");
      

       row.innerHTML = `
                <tr>
                  <td  style="text-align: center;">${cliente.nombre}</td>
                  <td  style="text-align: center;">${cliente.apellido}</td>
                  <td  style="text-align: center;">${cliente.telefono}</td>
                  <td class="text-center">
                    <div class="d-flex justify-content-center">
                      <button type="button" class="btn btn-outline-warning edit-btn" data-bs-toggle="modal"
                                    data-bs-target="#editar-cliente-modal">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button onclick="deleteCliente(${cliente.id})" class="btn btn-outline-danger del-btn">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
            `;
            
            row.querySelector(".edit-btn").addEventListener("click", function(){
        
              idInput.value = cliente.id
              nombreInput.value = cliente.nombre
              apellidoInput.value = cliente.apellido
              telefonoInput.value = cliente.telefono

          
            })
            
            row.querySelector(".del-btn").addEventListener("click", function(){

              DeleteCliente(cliente.id)

            })
            
            tbody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error al cargar Clientes:", error));
}

async function LoadUsuarios() {
  const tbody = document.getElementById("tbody-usuarios");
  const idInput = document.getElementById('editar-usuario-id')
  const nombreInput = document.getElementById('editar-usuarioNombre')
  const contraseñaInput = document.getElementById('editar-usuarioContraseña')
  const editarUsuarioInput = document.getElementById('editar-usuario-rol')
await fetch("https://localhost:7263/api/Usuario",{
  method:'GET',
  headers:{
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then((response) => response.json())
  .then(async(usuarios) => {
    tbody.innerHTML = ""; // Limpiar la tabla


    const rolesMap = {
      1: "Admin",
      2: "Estándar"
    };

    usuarios.forEach((usuario) => {
      console.log(usuario)
      const row = document.createElement("tr");
      

       row.innerHTML = `
                <tr>
                  <td  style="text-align: center;">${usuario.nombre}</td>
                  <td  style="text-align: center;">${usuario.contraseña}</td>
                   <td style="text-align: center;">${rolesMap[usuario.idTipoUsuario] || "Desconocido"}</td>
                  <td class="text-center">
                    <div class="d-flex justify-content-center">
                      <button type="button" class="btn btn-outline-warning edit-btn" data-bs-toggle="modal"
                                    data-bs-target="#editar-usuario-modal">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button onclick="DeleteUsuario(${usuario.id})" class="btn btn-outline-danger del-btn">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
            `;
            
            row.querySelector(".edit-btn").addEventListener("click", function(){
              
              LoadModalTipoUsuario('comboTiposUsuariosEditar')
              idInput.value = usuario.id
              nombreInput.value = usuario.nombre
              contraseñaInput.value = usuario.contraseña
              document.getElementById("comboTiposUsuarios").selected = usuario.idTipoUsuario

          
            })
            
            row.querySelector(".del-btn").addEventListener("click", function(){

              DeleteCliente(usuario.id)

            })
            
            tbody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error al cargar Clientes:", error));
}

//#endregion

//#region Entidades ----------------------------------------------------------------------------------------------------------------------------------------------------//



//#region Medicamento ----------------------------------------------------------------------------------------------------------------------------------------------------//
async function UpdateMedicamento() {

  const modal = document.getElementById('editar-medicamento-modal')
  const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal)


let med ={};
med.id = document.getElementById('editar-medicamentoId').value
med.nombre=document.getElementById('editar-medicamentoNombre').value
med.descripcion=document.getElementById('editar-medicamentoDescripcion').value
med.estado=document.getElementById('editar-medicamentoEstado').checked
if(ValidarEdicionMedicamento()===true){

  
        const response = await fetch(`https://localhost:7263/api/Medicamento/${med.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(med),
        credentials: 'same-origin'
        
    })
    if(response.ok){
      LoadMedicamentos()
      modalInstance.hide()
      alert('medicamento Actualizo correctamente')
    }
}
}

// O delete entidad, como lo veas mejor
async function DeleteMedicamento(id){

  if (confirm("Eliminar medicamento con id "+ id+ "?")) {
      const response = await fetch(`https://localhost:7263/api/Medicamento/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(id),
          credentials: 'same-origin'
      })
      if(response.ok){
        alert('medicamento Eliminado correctamente')
      }
  }
}

async function CreateMedicamento(){

  const modal = document.getElementById('nuevo-medicamento-modal')
  const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal)

if(ValidarNuevoMedicamento()===true){

  let med ={};
  med.nombre=document.getElementById('nuevo-medicamentoNombre').value
  med.descripcion=document.getElementById('nuevo-medicamentoDescripcion').value
  med.estado=document.getElementById('nuevo-medicamentoEstado').checked
  console.log()
    const response = await fetch('https://localhost:7263/api/Medicamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(med),
        credentials: 'same-origin'
        
    })
    if(response.ok){
      LoadMedicamentos()
      modalInstance.hide()
      alert('medicamento Creado correctamente')
    }
}

}
function ValidarNuevoMedicamento(){

  const nombreInput = document.getElementById('nuevo-medicamentoNombre')
  const descripcionInput = document.getElementById('nuevo-medicamentoDescripcion')

  if(nombreInput.value === ""){

    
    alert('por favor introduzca un nombre')
    return false
  }
  if(descripcionInput.value === ""){
    alert('por favor introduzca una descripcion')
    return false
  }
  

  return true
}
function ValidarEdicionMedicamento(){

  const nombreInput = document.getElementById('editar-medicamentoNombre')
  const descripcionInput = document.getElementById('editar-medicamentoDescripcion')

  if(nombreInput.value === ""){

    
    alert('por favor introduzca un nombre')
    return false
  }
  if(descripcionInput.value === ""){
    alert('por favor introduzca una descripcion')
    return false
  }
  

  return true
}


//#endregion Medicamento

//#region Factura  ----------------------------------------------------------------------------------------------------------------------------------------------------//
async function UpdateFactura(factura) {
  const lstDetalles =[]
  let contador = 0;
  const filas = document.querySelectorAll('#table-detallesFactura tr')
  if(ValidarEdicionFactura()===true){
  filas.forEach(fila => {
    contador++
    const celdas = fila.querySelectorAll('td');
    let detalleFactura = {}
    celdas.forEach(celda => {
      if (celdas.length === 0) return;
      if(celda.cellIndex===0){
        detalleFactura.idMedicamento = celda.textContent
      }
      if(celda.cellIndex===2){
        detalleFactura.cantidad = celda.textContent
      }
      if(celda.cellIndex===3){
        detalleFactura.precioUnitario = celda.textContent
      }
    });
    if (Object.keys(detalleFactura).length > 0) {
      lstDetalles.push(detalleFactura);
    
    }
  });
  


  let facturaUPD = {
    id: document.getElementById("editar-facturaId").value,
    idCliente: document.getElementById("comboClientesEditar").value,
    fecha: (document.getElementById("editar-facturaFecha").value = new Date().toISOString()),
    detallesFacturas: lstDetalles
  };
  console.log(facturaUPD);

  const response = await fetch(`https://localhost:7263/api/Factura/${facturaUPD.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(facturaUPD),
    credentials: "same-origin",
  });
  }
  if (response.ok) {
    LoadFacturas();
    alert("factura actualizada correctamente");
  }
}


async function DeleteFactura(id){
  const response = await fetch(`https://localhost:7263/api/Factura/${id}`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json'},
  body: JSON.stringify(id),
  credentials: 'same-origin'
  
})
if(response.ok){
LoadFacturas()
alert('factura Eliminada correctamente')
}
}

 async function CreateFactura() {
 
  const lstDetalles =[]
  let contador = 0;
  const filas = document.querySelectorAll('#table-detallesFactura tr')
  if(ValidarNuevaFactura()===true){
  filas.forEach(fila => {
    contador++
    const celdas = fila.querySelectorAll('td');
    let detalleFactura = {}
    celdas.forEach(celda => {
      if (celdas.length === 0) return;
      if(celda.cellIndex===0){
        detalleFactura.idMedicamento = celda.textContent
      }
      if(celda.cellIndex===2){
        detalleFactura.cantidad = celda.textContent
      }
      if(celda.cellIndex===3){
        detalleFactura.precioUnitario = celda.textContent
      }
    });
    if (Object.keys(detalleFactura).length > 0) {
      

        lstDetalles.push(detalleFactura);
      
    
    }
  })};
   
  console.log(lstDetalles)

   let factura = {};
   const cboCliente = document.getElementById("comboClientes");
   factura.idCliente = lstClientes[cboCliente.selectedIndex].id;
   var fecha = document.getElementById("nueva-facturaFecha").value;
   fecha = new Date().toISOString();
   factura.fecha = fecha
   factura.detallesFacturas = lstDetalles;
   console.log(factura);

   const response = await fetch("https://localhost:7263/api/Factura", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(factura),
     credentials: "same-origin",
   });
   if (response.ok) {
     LoadFacturas();
     alert("factura Creada correctamente");
     document.getElementById("tbody-detallesFactura").innerHTML = ""
   }
 }

 function ValidarNuevaFactura(){

  const cantidadInput = document.getElementById('nuevo-detalleCantidad')
  const precioInput = document.getElementById('nuevo-detallePrecioUnitario')
  const filas = document.querySelectorAll('#table-detallesFactura tr')
  let i = 0
  filas.forEach(fila => {
    i++
    console.log('pppppppppppppppppppp: '+i)
    
  });
  if(i<4){
    alert('por favor introduzca un detalle')
    return false
  }
  if(cantidadInput.value === ""){

    
    alert('por favor introduzca cantidad')
    return false
  }
  if(precioInput.value === ""){
    alert('por favor introduzca un precio')
    return false
  }
  
  return true
}
function ValidarEdicionFactura(){

  const cantidadInput = document.getElementById('nuevo-detalleCantidad')
  const precioInput = document.getElementById('nuevo-detallePrecioUnitario')
  const filas = document.querySelectorAll('#table-detallesFactura tr')
  let i = 0
  filas.forEach(fila => {
    i++
    console.log('pppppppppppppppppppp: '+i)
    
  });
  if(i<4){
    alert('por favor introduzca un detalle')
    return false
  }
  if(cantidadInput.value === ""){

    
    alert('por favor introduzca cantidad')
    return false
  }
  if(precioInput.value === ""){
    alert('por favor introduzca un precio')
    return false
  }
  
  return true
}
 

//#endregion Factura

//#region Clientes



async function UpdateCliente() {

  const modal = document.getElementById('editar-cliente-modal')
  const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal)

  let cliente = {};
  cliente.id = document.getElementById('editar-cliente-Id').value
  cliente.nombre = document.getElementById('editar-clienteNombre').value
  cliente.apellido = document.getElementById('editar-clienteApellido').value
  cliente.telefono = document.getElementById('editar-cliente-numero').value
  
  if(ValidarEdicionCliente()===true){
    
    const response = await fetch(`https://localhost:7263/api/Cliente/${cliente.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
    credentials: 'same-origin'
    
  })
  if(response.ok){
  LoadClientes()
  modalInstance.hide()
  alert('cliente actualizado correctamente')
  }

  }
}
async function DeleteCliente(id){
  const response = await fetch(`https://localhost:7263/api/Cliente/${id}`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(id),
  credentials: 'same-origin'
  
})
if(response.ok){
LoadClientes()
alert('cliente Eliminado correctamente')
}
}

async function CreateCliente(){
  
  const modal = document.getElementById('nuevo-cliente-modal')
  const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal)
  
  if (ValidarNuevoCliente()==true){

    let cliente = {};
    cliente.nombre = document.getElementById('nuevo-clienteNombre').value
    cliente.apellido = document.getElementById('nuevo-clienteApellido').value
    cliente.telefono = document.getElementById('nuevo-cliente-numero').value
    const response = await fetch('https://localhost:7263/api/Cliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
      credentials: 'same-origin'
      
    })
    if(response.ok){
    LoadClientes()
    modalInstance.hide()
    alert('cliente Creado correctamente')
    }
  }
  
  }

function ValidarNuevoCliente(){

  const nombreInput = document.getElementById('nuevo-clienteNombre')
  const apellidoInput = document.getElementById('nuevo-clienteApellido')
  const telefonoInput = document.getElementById('nuevo-cliente-numero')

  if(nombreInput.value === ""){

    
    alert('por favor introduzca un nombre')
    return false
  }
  if(apellidoInput.value === ""){
    alert('por favor introduzca un apellido')
    return false
  }
  if(telefonoInput.value === ""){
    alert('por favor introduzca un telefono')
    return false
  }

  return true
}
function ValidarEdicionCliente(){

  const nombreInput = document.getElementById('editar-clienteNombre')
  const apellidoInput = document.getElementById('editar-clienteApellido')
  const telefonoInput = document.getElementById('editar-cliente-numero')

  if(nombreInput.value === ""){

    
    alert('por favor introduzca un nombre')
    return false
  }
  if(apellidoInput.value === ""){
    alert('por favor introduzca un apellido')
    return false
  }
  if(telefonoInput.value === ""){
    alert('por favor introduzca un telefono')
    return false
  }

  return true
}




//#endregion Clientes

//#region Usuarios

  


async function UpdateUsuario() {

  const modal = document.getElementById('editar-usuario-modal')
  const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal)

  let usuario = {};
  usuario.id = document.getElementById('editar-usuario-id').value
  usuario.nombre = document.getElementById('editar-usuarioNombre').value
  usuario.contraseña = document.getElementById('editar-usuarioContraseña').value
  usuario.idTipoUsuario = document.getElementById('comboTiposUsuariosEditar').value
  console.log(usuario)

  if(ValidarEdicionUsuario()===true){

    const response = await fetch(`https://localhost:7263/api/Usuario?id=${usuario.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`},
    body: JSON.stringify(usuario),
    credentials: 'same-origin'
    
  })
  if(response.ok){
  LoadUsuarios()
  modalInstance.hide()
  alert('usuario actualizado correctamente')
  }
  }
}


async function DeleteUsuario(id){
  const response = await fetch(`https://localhost:7263/api/Usuario/${id}`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}` },
  body: JSON.stringify(id),
  credentials: 'same-origin'
  
})
if(response.ok){
LoadUsuarios()
alert('Usuario Eliminado correctamente')
}
}


async function CreateUsuario(){
  
      const modal = document.getElementById('nuevo-usuario-modal')
      const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal)
  
  if(ValidarNuevoUsuario()===true){
    
    
    let usuario = {};
    usuario.nombre = document.getElementById('nuevo-usuarioNombre').value
    usuario.contraseña = document.getElementById('nuevo-usuarioContraseña').value
    usuario.idTipoUsuario = document.getElementById('comboTiposUsuarios').value
    const response = await fetch('https://localhost:7263/api/Usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(usuario),
      credentials: 'same-origin'
      
    })
    if(response.ok){
      LoadUsuarios()
      modalInstance.hide()
      alert('Usuario Creado correctamente')
    }
  }
  

  
  }



  function ValidarNuevoUsuario(){

    const nombreInput = document.getElementById('nuevo-usuarioNombre')
    const contraseñaInput = document.getElementById('nuevo-usuarioContraseña')
  
    if(nombreInput.value === ""){
  
      
      alert('por favor introduzca un nombre')
      nombreInput.focus()
      return false
    }
    if(contraseñaInput.value === ""){
      alert('por favor introduzca una contraseña')
      return false
    }
    
  
    return true
  }



  function ValidarEdicionUsuario(){

    const nombreInput = document.getElementById('editar-usuarioNombre')
    const contraseñaInput = document.getElementById('editar-usuarioContraseña')
  
    if(nombreInput.value === ""){
  
      
      alert('por favor introduzca un nombre')
      return false
    }
    if(contraseñaInput.value === ""){
      alert('por favor introduzca una contraseña')
      return false
    }
    
  
    return true
  }


//#endregion


//#endregion Entidades

//#region Login ----------------------------------------------------------------------------------------------------------------------------------------------------//


function mostrarMenu() {
  const menu = document.getElementById("inicio")
  menu.style.display = 'block'
  const menus = document.getElementsByClassName("menu-oculto");

  for (let menu of menus) {
    menu.className = "nav-link w-100";
  }
  for (let menu of menus) {
    menu.className = "nav-link w-100";
  }
  for (let menu of menus) {
    menu.className = "nav-link w-100";
  }

  document.getElementById("inicio").innerHTML = `
                       
                            <div class="d-flex justify-content-center">
                              <img src="assets/Logo.gif"  alt="..." style="height: 40%;width: 40%;">
                              </div>
                              <div class="d-flex justify-content-center">
                                <img src="assets/Bienvenida.gif"  alt="..." style="height: 100%;width: 100%;">
                              </div>
                            
  `
}

function esconderMenu(){
  const menu = document.getElementById("inicio")
  menu.style.display = 'none'
}
function storeToken(token){
 localStorage.setItem('token',token)
}

function login_succes(nombre, token) {
    
  document.getElementById('logoutBtn').addEventListener('click', function() {
      alert('Sesión cerrada');
      location.reload(); 
  });
  
  document.getElementById('sidebar-user').innerText = nombre
  
  mostrarMenu()
  storeToken(token)
}


async function Login(url) {
  const nombre = document.getElementById("loginUsuario").value;
  const contraseña = document.getElementById("loginContraseña").value;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      contraseña: contraseña,
    }),
    credentials: "same-origin",
  })
    .then( async response => await response.json())
    .then( token => {
      if (token != null) {
        login_succes(nombre, token.token);
      }
    })
    .catch((error) => {
      console.error("Error en el login:", error);
    });
}

//#endregion