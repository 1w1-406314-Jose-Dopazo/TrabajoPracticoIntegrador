// const localhost = "https://localhost:7263/api/";
//#region forms





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
function LoadModalEditarFactura(){
  
  LoadComboClientes("comboClientesEditar")
  LoadComboMedicamentos("comboMedicamentosEditar")
  document.getElementById("editar-facturaFecha").value = new Date().toLocaleDateString()


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

function LimpiarDetalles(){
    document.getElementById("tbody-detallesFactura").innerHTML = ""
}

let lstDetallesLocal =[];
function AgregarDetalle(idComboM,idDetCant,idDetPre,tbody){
    idTbody=tbody
    const medicamento = document.getElementById(idComboM)
    const medicamentoId = medicamento.value
    const medicamentoNombre = medicamento.options[medicamento.selectedIndex].text;
    const cantidad = document.getElementById(idDetCant).value
    const precio = document.getElementById(idDetPre).value
    console.log(medicamentoId + " " + medicamentoNombre + " " + cantidad + " " + precio)
    
    if (cantidad > 0) {
      lstDetallesLocal.push(
        {
          "cantidad":  cantidad,
          "precioUnitario":  precio,
          "idMedicamento": medicamentoId 
        }
      )

        const tbody = document.getElementById(idTbody)
        const row = document.createElement("tr")
        row.className = "text-center"
        row.innerHTML = `
                        <td>${medicamentoNombre}</td>
                        <td>${cantidad}</td>
                        <td>${precio}</td>
                        <td>
                            <button class="btn btn-outline-danger delete-btn">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
        `;
        tbody.appendChild(row)
        row.querySelector(".delete-btn").addEventListener('click', () => {
            row.remove()
        })
    }


}

async function LoadFacturas() {
  await fetch("https://localhost:7263/api/Factura")
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
          LoadModalEditarFactura()
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
          DeleteMedicamento(factura.id);
          console.log("Botón de eliminar presionado para:", factura);
          // Eliminar medicamento
        });

        tbody.appendChild(row);
      };
    }

    async function LoadDetallesFacturaInfo(id) {
      await fetch("https://localhost:7263/api/DetalleFactura/GetByFactura?id=" + id)
        .then((response) => response.json())
        .then(async (detallesFactura) => {
          const tbody = document.getElementById("tbody-detallesFacturaInfo");
          tbody.innerHTML = ""; // Limpiar la tabla
    
          for (const detalleFactura of detallesFactura) {
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
      await fetch("https://localhost:7263/api/DetalleFactura/GetByFactura?id=" + id)
        .then((response) => response.json())
        .then(async (detallesFactura) => {
          const tbody = document.getElementById("tbody-detallesFacturaEditar");
          tbody.innerHTML = ""; // Limpiar la tabla
    
          for (const detalleFactura of detallesFactura) {
            const row = document.createElement("tr");
            row.className = "text-center";
            lstDetallesLocal.push({
              "cantidad":  detalleFactura.cantidad,
              "precioUnitario":  detalleFactura.precioUnitario,
              "idMedicamento": detalleFactura.idMedicamento 
            })
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

//#endregion

//#region Entidades ----------------------------------------------------------------------------------------------------------------------------------------------------//



//#region Medicamento ----------------------------------------------------------------------------------------------------------------------------------------------------//
async function UpdateMedicamento() {

let med ={};
med.id = document.getElementById('editar-medicamentoId').value
med.nombre=document.getElementById('editar-medicamentoNombre').value
med.descripcion=document.getElementById('editar-medicamentoDescripcion').value
med.estado=document.getElementById('editar-medicamentoEstado').checked

console.log(med)

      const response = await fetch('https://localhost:7263/api/Medicamento', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(med),
      credentials: 'same-origin'
      
  })
  if(response.ok){
    LoadMedicamentos()
    alert('medicamento Actualizo correctamente')
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
    alert('medicamento Creado correctamente')
  }

}

//#endregion Medicamento

//#region Factura  ----------------------------------------------------------------------------------------------------------------------------------------------------//
async function UpdateFactura(factura) {
  // facturaUPD.id = document.getElementById('editar-facturaId').value
  // const cboCliente = document.getElementById('comboClientesEditar')
  // facturaUPD.idCliente =  lstClientes[cboCliente.selectedIndex].id
  // fecha = document.getElementById("editar-facturaFecha").value = new Date().toISOString()
  // facturaUPD.fecha = fecha
  // facturaUPD.detallesFacturasDto = lstDetallesLocal
  


  let facturaUPD = {
    id: document.getElementById("editar-facturaId").value,
    idCliente: document.getElementById("comboClientesEditar").value,
    fecha: (document.getElementById("editar-facturaFecha").value = new Date().toISOString()),
    detallesFacturasDto: lstDetallesLocal,
  };
  console.log(facturaUPD);

  const response = await fetch("https://localhost:7263/api/Factura", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(facturaUPD),
    credentials: "same-origin",
  });
  if (response.ok) {
    alert("factura actualizada correctamente");
  }
}


async function DeleteFactura(id){
  const response = await fetch(`https://localhost:7263/api/Factura/${id}`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(obj),
  credentials: 'same-origin'
  
})
if(response.ok){
alert('factura Eliminada correctamente')
}
}

 async function CreateFactura() {
   let factura = {};
   const cboCliente = document.getElementById("comboClientes");
   factura.idCliente = lstClientes[cboCliente.selectedIndex].id;
   var fecha = document.getElementById("nueva-facturaFecha").value;
   fecha = new Date().toISOString();
   factura.fecha = fecha
   factura.detallesFacturasDto = lstDetallesLocal;
   console.log(factura);

   const response = await fetch("https://localhost:7263/api/Factura", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(factura),
     credentials: "same-origin",
   });
   if (response.ok) {
     alert("factura Creada correctamente");
     document.getElementById("tbody-detallesFactura").innerHTML = ""
   }
 }

//#endregion Factura

//#region Clientes



async function UpdateCliente() {

  let cliente = {};
  cliente.id = document.getElementById('editar-cliente-Id').value
  cliente.nombre = document.getElementById('editar-clienteNombre').value
  cliente.apellido = document.getElementById('editar-clienteApellido').value
  cliente.telefono = document.getElementById('editar-cliente-numero').value

  const response = await fetch(`https://localhost:7263/api/Cliente/${cliente.id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(cliente),
  credentials: 'same-origin'
  
})
if(response.ok){
LoadClientes()
alert('cliente actualizado correctamente')
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




//#endregion Clientes

//#endregion Entidades

//#region Login ----------------------------------------------------------------------------------------------------------------------------------------------------//


function mostrarMenu(token) {
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
                        <div
                            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <h1 class="h2">Token de sesion:</h1>
                            </div>
                        </div>
                        <p>${token}</p>
  `
}

function login_succes(nombre, token) {
    
  document.getElementById('logoutBtn').addEventListener('click', function() {
      alert('Sesión cerrada');
      location.reload(); 
  });
  
  document.getElementById('sidebar-user').innerText = nombre
  
  mostrarMenu(token)
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
      username: nombre,
      password: contraseña,
    }),
    credentials: "same-origin",
  })
    .then( async response => await response.json())
    .then( token => {
      console.log("Login exitoso", token);
      if (token != null) {
        login_succes(nombre, token.token);
      }
    })
    .catch((error) => {
      console.error("Error en el login:", error);
    });
}

//#endregion