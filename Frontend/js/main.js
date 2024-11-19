// const localhost = "https://localhost:7263/api/";
//#region forms

async function LoadComboClientes(idCombo) {
  fetch("https://localhost:7263/api/cliente")
    .then((respones) => respones.json())
    .then((clientes) => {
      const selectCliente = document.getElementById(idCombo);
      selectCliente.innerHTML = "";

      clientes.forEach((cliente) => {
        const option = document.createElement("option");

        option.value = cliente.id;
        option.text = cliente.nombre + " " + cliente.apellido;

        selectCliente.appendChild(option);
      });
    });
}

function LoadComboMedicamentos(idCombo) {
  fetch("https://localhost:7263/api/medicamento")
    .then((respones) => respones.json())
    .then((medicamentos) => {
      const selectCliente = document.getElementById(idCombo);
      selectCliente.innerHTML = "";

      medicamentos.forEach((medicamento) => {
        if (medicamento.estado) {
          const option = document.createElement("option");

          option.value = medicamento.id;
          option.text = medicamento.nombre;

          selectCliente.appendChild(option);
        }
      });
    });
}

function LoadComboTiposUsuarios(idCombo) {
  fetch("https://localhost:7263/api/TipoUsuario")
    .then((respones) => respones.json())
    .then((tiposUsuarios) => {
      const selectTipoUsuario = document.getElementById(idCombo);
      selectTipoUsuario.innerHTML = "";

      tiposUsuarios.forEach((tipoUsuario) => {
        const option = document.createElement("option");

        option.value = tipoUsuario.id;
        option.text = tipoUsuario.nombre;

        selectTipoUsuario.appendChild(option);
      });
    });
}

function LoadModalEditarFactura(factura){
  LoadComboClientes("editar-facturaComboClientes")
  LoadComboMedicamentos("editar-facturaComboMedicamentos")
  LoadDetallesFactura(factura.id)
  document.getElementById("editar-facturaFecha").value = new Date(factura.fecha).toLocaleDateString("es-ES")
  document.getElementById("editar-facturaId").value = factura.id
  
  console.log(document.getElementById("editar-facturaComboClientes").value)
}

function LoadModalNuevaFactura(){
  // LimpiarDetalles("table-detallesFactura")
  LoadComboClientes("nueva-facturaComboClientes")
  LoadComboMedicamentos("nueva-facturaComboMedicamentos")
  document.getElementById("nueva-facturaFecha").value = new Date().toLocaleDateString("es-ES")
}

function LoadModalTipoUsuario(cboId){
  LoadComboTiposUsuarios(cboId)
}

function LoadModalEditarMedicamento(medicamento) {
  document.getElementById("editar-medicamentoId").value = medicamento.id;
  document.getElementById("editar-medicamentoNombre").value = medicamento.nombre;
  document.getElementById("editar-medicamentoDescripcion").value = medicamento.descripcion;
  document.getElementById("editar-medicamentoEstado").value = medicamento.estado;
  document.getElementById("editar-medicamentoPrecio").value = medicamento.precioUnitario;
}

//#endregion

//#region tablas

async function LoadMedicamentos() {
await fetch("https://localhost:7263/api/Medicamento")
  .then((response) => response.json())
  .then((medicamentos) => {
    const tbody = document.getElementById("tbody-medicamentos");
    tbody.innerHTML = ""; // Limpiar la tabla

    const modalEditarMedicamento = new bootstrap.Modal(document.getElementById('editar-medicamento-modal'))

    medicamentos.forEach((medicamento) => {
      const row = document.createElement("tr");
      
      row.innerHTML = `
      <td class="text-center">${medicamento.nombre}</td>
      <td class="text-center">${medicamento.descripcion}</td>
      <td class="text-center">${medicamento.precioUnitario}</td>
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
        console.log("Botón de editar presionado para:", medicamento);
        LoadModalEditarMedicamento(medicamento)        
        modalEditarMedicamento.show()
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

function LimpiarDetalles(idTbody){
    document.getElementById(idTbody).innerHTML = ""
}

let lstDetallesLocal =[];
async function AgregarDetalle(
  idComboMedicamento,
  idMedicamentoCantidad,
  idTbody
) {
  const comboMedicamentos = document.getElementById(idComboMedicamento);

  const idMedicamento = comboMedicamentos.value;
  const medicamento = await fetch(
    `https://localhost:7263/api/medicamento/` + idMedicamento
  ).then((response) => response.json());
  const cantidad = document.getElementById(idMedicamentoCantidad).value;
  if (cantidad < 1 || cantidad == null) {
    alert("Debe seleccionar al menos un medicamento");
    return;
  }
  console.log(
    idMedicamento +
      " " +
      medicamento.nombre +
      " " +
      cantidad +
      " " +
      medicamento.precioUnitario
  );
  const tbody = document.getElementById(idTbody);
  let existingRow = null;
  // esto de acá funciona generando un array a partir de las filas del tbody (vale oro)
  Array.from(tbody.rows).forEach((row) => {
    const rowMedicamentoId = row.cells[0].textContent.trim();
    if (rowMedicamentoId === idMedicamento) {
      existingRow = row;
    }
  });

  if (existingRow) {
    const currentQuantity = parseInt(
      existingRow.cells[2].textContent.trim(),
      10
    );
    const newQuantity = currentQuantity + parseInt(cantidad);
    existingRow.cells[2].textContent = newQuantity;
  } else {
    lstDetallesLocal.push({
      idMedicamento: idMedicamento,
      cantidad: cantidad,
      precioUnitario: medicamento.precioUnitario,
    });

    const row = document.createElement("tr");
    row.className = "text-center";
    row.innerHTML = `
              <td class="d-none">${idMedicamento}</td>
              <td>${medicamento.nombre}</td>
              <td>${cantidad}</td>
              <td>${medicamento.precioUnitario}</td>
              <td>
                  <button class="btn btn-outline-danger delete-btn">
                      <i class="bi bi-trash"></i>
                      </button>
                      </td>
                      `;
    tbody.appendChild(row);
    row.querySelector(".delete-btn").addEventListener("click", () => {
      row.remove();
    });
  }
}

async function LoadFacturas() {
  await fetch("https://localhost:7263/api/Factura")
    .then((response) => response.json())
    .then((facturas) => {
      const tbody = document.getElementById("tbody-facturas");
      tbody.innerHTML = ""; // Limpiar la tabla

      const modalEditarFactura = new bootstrap.Modal(
        document.getElementById("editar-factura-modal")
      );
      const modalInfoFactura = new bootstrap.Modal(
        document.getElementById("info-factura-modal")
      );
      console.log(facturas)

      facturas.forEach( async (factura) => {
        const cliente = await fetch(
          `https://localhost:7263/api/Cliente/${factura.idCliente}`
        ).then((response) => response.json());

        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${cliente.nombre + " " + cliente.apellido}</td>
      <td>${new Date(factura.fecha).toLocaleDateString("es-ES")}</td>
      <td>
        <div class="btn-group me-2">
          <button type="button" class="btn btn-outline-warning edit-btn">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-outline-warning info-btn">
            <i class="bi bi-info-lg"></i>
          </button>
          <button class="btn btn-outline-danger delete-btn">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
      `;
        // Agregar el evento para el botón de editar
        row.querySelector(".edit-btn").addEventListener("click", function () {
          LoadModalEditarFactura(factura);
          modalEditarFactura.show();
          console.log("Botón de editar presionado para:", factura);
          // Mostrar modal
        });

        // Agregar el evento para el boton de informacion de factura
        row.querySelector(".info-btn").addEventListener("click", function () {
          LoadModalInfoFactura(factura.id);
          modalInfoFactura.show();
          console.log("Botón de info presionado para:", factura);
          // Mostrar modal
        });

        // Agregar el evento para el botón de eliminar
        row.querySelector(".delete-btn").addEventListener("click", function () {
          DeleteFactura(factura.id);
          console.log("Botón de eliminar presionado para:", factura);
          // Eliminar medicamento
        });

        tbody.appendChild(row);
      });
    });
}


    async function LoadModalInfoFactura(id) {
      await fetch("https://localhost:7263/api/Factura/" + id)
        .then((response) => response.json())
        .then(async (factura) => {
          const cliente = await fetch(
            `https://localhost:7263/api/Cliente/${factura.idCliente}`
          ).then((response) => response.json());
          document.getElementById("info-facturaCliente").value = cliente.nombre +" "+ cliente.apellido
          document.getElementById("info-facturaFecha").value = new Date(factura.fecha).toLocaleDateString("es-ES")

          const tbody = document.getElementById("tbody-detallesFacturaInfo");
          tbody.innerHTML = ""; // Limpiar la tabla

          factura.detallesFacturas.forEach(async (detalleFactura) => {
            const medicamento = await fetch(
              `https://localhost:7263/api/Medicamento/${detalleFactura.idMedicamento}`
            ).then((response) => response.json());
            const row = document.createElement("tr");
            row.innerHTML = `
                    <tr>
                      <td class="d-none">${medicamento.id}</td>
                      <td>${medicamento.nombre}</td>
                      <td>${detalleFactura.cantidad}</td>
                      <td>${detalleFactura.precioUnitario}</td>
                    <tr>
                      `;
            tbody.appendChild(row);
          })
        })
        .catch((error) => console.error("Error al cargar info de la factura:", error));
    }

    async function LoadDetallesFactura(id) {
      await fetch("https://localhost:7263/api/Factura/" + id)
        .then(async (response) => await response.json())
        .then((factura) => {
          const tbody = document.getElementById("tbody-detallesFacturaEditar");
          tbody.innerHTML = ""; // Limpiar la tabla


          factura.detallesFacturas.forEach( async (detalleFactura) => {
            const medicamento = await fetch(`https://localhost:7263/api/Medicamento/${detalleFactura.idMedicamento}`)
            .then(async (response) => await response.json());

            const row = document.createElement("tr");
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

            // Agregar el evento para el botón de eliminar
            row.querySelector(".delete-btn").addEventListener("click", () => {
              row.remove();
            });
            tbody.appendChild(row);
          });
        })
        .catch((error) =>
          console.error(`Error al cargar detalles de la factura id: ${id}`,error)
      );
    }
    
    // fetch("https://localhost:7263/api/Medicamento")
    // .then((response) => response.json())
    // .then((medicamentos) => {
    //   const tbody = document.getElementById("tbody-medicamentos");
    //   tbody.innerHTML = "";


async function LoadClientes() {
  await fetch("https://localhost:7263/api/Cliente")
  .then(async (response) => await response.json())
  .then((clientes) => {
    const tbody = document.getElementById("tbody-clientes");
    tbody.innerHTML = "";

    clientes.forEach((cliente) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <tr>
                  <td>${cliente.nombre}</td>
                  <td>${cliente.apellido}</td>
                  <td>${cliente.telefono}</td>
                  <td>
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
              LoadModalEditarCliente();         
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
  const modal = document.getElementById("editar-medicamento-modal");
  const modalInstance =
    bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);

  let med = {};
  med.id = document.getElementById("editar-medicamentoId").value;
  med.nombre = document.getElementById("editar-medicamentoNombre").value;
  med.descripcion = document.getElementById("editar-medicamentoDescripcion").value;
  med.estado = document.getElementById("editar-medicamentoEstado").checked;
  med.precioUnitario = document.getElementById("editar-medicamentoPrecio").value;
  
  const response = await fetch(`https://localhost:7263/api/Medicamento/${med.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(med),
    credentials: "same-origin",
  });
  if (response.ok) {
    LoadMedicamentos();
    modalInstance.hide();
    alert("medicamento Actualizo correctamente");
  }else{
    alert(response.json())
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
        LoadMedicamentos()
        alert('medicamento Eliminado correctamente')
      }
  }
}

async function CreateMedicamento() {
  const modal = document.getElementById("nuevo-medicamento-modal");
  const modalInstance =
    bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);

  let med = {};
  med.nombre = document.getElementById("nuevo-medicamentoNombre").value;
  med.descripcion = document.getElementById("nuevo-medicamentoDescripcion").value;
  med.estado = document.getElementById("nuevo-medicamentoEstado").checked;
  med.precioUnitario = document.getElementById("nuevo-medicamentoPrecio").value;
  const response = await fetch("https://localhost:7263/api/Medicamento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(med),
    credentials: "same-origin",
  });
  if (response.ok) {
    LoadMedicamentos();
    modalInstance.hide();
    alert("medicamento Creado correctamente");
  }
}
//#endregion Medicamento

//#region Factura  ----------------------------------------------------------------------------------------------------------------------------------------------------//
async function UpdateFactura() {
  const lstDetalles =[]
  let contador = 0;
  //Filas de la tr del tbody
  const filas = document.querySelectorAll('#table-detallesFacturaEditar tr')

  if(ValidarFactura("table-detallesFacturaEditar")){
    filas.forEach(fila => {
      contador++
      const celdas = fila.querySelectorAll('td');
      let detalleFactura = {}
  
      celdas.forEach(celda => {
        if (celdas.length === 0) return;
        if(celda.cellIndex===0){
          detalleFactura.idMedicamento = parseInt(celda.textContent)
        }
        if(celda.cellIndex===2){
          detalleFactura.cantidad = parseInt(celda.textContent)
        }
        if(celda.cellIndex===3){
          detalleFactura.precioUnitario = parseFloat(celda.textContent)
        }
      });
      if (Object.keys(detalleFactura).length > 0) {
        console.log(detalleFactura);
        lstDetalles.push(detalleFactura);
        }
    })};
    if (Object.keys(detalleFactura).length > 0) {
      console.log(detalleFactura);
      lstDetalles.push(detalleFactura);
      }
      console.log(lstDetalles)

      let factura = {};
      factura.id = document.getElementById("editar-facturaId")
      factura.idCliente = document.getElementById("editar-facturaComboClientes").value
      factura.fecha = new Date().toISOString();
      factura.detallesFacturas = lstDetalles;
  
      console.log(factura);
   
      const response = await fetch(`https://localhost:7263/api/Factura/${factura.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(factura),
        credentials: "same-origin",
      });
      if (response.ok) {
        LoadFacturas();
        alert("factura actualizada correctamente");
        document.getElementById("tbody-detallesFacturaEditar").innerHTML = ""
      }else{
       alert("No se pudo actualizar la factura")
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

function ValidarFactura(idTableDetallesFactura){
  console.log(`#${idTableDetallesFactura} tr`)
  const tbody = document.getElementById(`tbody-detallesFacturaNuevo`)
  const filas = tbody.querySelectorAll("tr");
  let i = 0
  if(filas.length < 1){
    alert('por favor introduzca al menos un medicamento')
    return false
  }  
  return true
}

 async function CreateFactura() {
  const lstDetalles =[]
  let contador = 0;
  //Filas de la tr del tbody
  const filas = document.querySelectorAll('#table-detallesFacturaNueva tr')

  if(ValidarFactura("tbody-detallesFacturaNuevo")){
  filas.forEach(fila => {
    contador++
    const celdas = fila.querySelectorAll('td');
    let detalleFactura = {}

    celdas.forEach(celda => {
      if (celdas.length === 0) return;
      if(celda.cellIndex===0){
        detalleFactura.idMedicamento = parseInt(celda.textContent)
      }
      if(celda.cellIndex===2){
        detalleFactura.cantidad = parseInt(celda.textContent)
      }
      if(celda.cellIndex===3){
        detalleFactura.precioUnitario = parseFloat(celda.textContent)
      }
    });
    if (Object.keys(detalleFactura).length > 0) {
      console.log(detalleFactura);
      lstDetalles.push(detalleFactura);
      }
  })};
  console.log(lstDetalles)

   let factura = {};
   const cboCliente = document.getElementById("nueva-facturaComboClientes");
   factura.idCliente = cboCliente.value
   factura.fecha = new Date().toISOString();
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
     document.getElementById("tbody-detallesFacturaNuevo").innerHTML = ""
   }else{
    alert("No se pudo crear la factura")
   }
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
  document.getElementById("inicio").innerHTML = `
                       
                            <div class="d-flex justify-content-center">
                              <img src="assets/Logo.gif"  alt="..." style="height: 40%;width: 40%;">
                              </div>
                              <div class="d-flex justify-content-center">
                                <img src="assets/Bienvenida.gif"  alt="..." style="height: 100%;width: 100%;">
                              </div>                           
  `
}
  document.getElementById("login").classList.remove("active")
  document.getElementById("sidebarMenu").classList.remove("d-none")

async function Login() {
  const url = 'https://localhost:7263/api/Login'
  const nombre = document.getElementById("loginUsuario").value;
  console.log(nombre)
  const contraseña = document.getElementById("loginContraseña").value;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre: nombre, contraseña: contraseña }),
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((token) => {
      if (token != null) {
        localStorage.setItem('token',token)
        document.getElementById('logoutBtn').addEventListener('click', function() {
          alert('Sesión cerrada');
          localStorage.removeItem(key = "token")
          location.reload(); 
      });
      document.getElementById('navbar-user').innerText = nombre
      document.getElementById("login").classList.remove("active")
      document.getElementById("sidebarMenu").classList.remove("d-none")
      // mostrarMenu()
      }else{
        console.log(response)
      }
    })
    .catch((error) => {
      console.error("Error en el login:", error);
    });
}
//#endregion