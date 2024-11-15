// const localhost = "https://localhost:7263/api/";
//#region forms

function LoadComboClientes(){
    fetch("https://localhost:7263/api/cliente")
    .then(respones => respones.json())
    .then(clientes => {
        const selectCliente = document.getElementById("comboClientes")
        selectCliente.innerHTML = ""
        clientes.forEach(cliente => {
            const option = document.createElement("option")
            option.value = cliente.id
            option.text = cliente.nombre + " " + cliente.apellido
            selectCliente.appendChild(option)
        });
    })
}

function LoadComboMedicamentos() {
  fetch("https://localhost:7263/api/medicamento")
    .then((respones) => respones.json())
    .then((medicamentos) => {
      const selectCliente = document.getElementById("comboMedicamentos");
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

function LoadModalNuevaFactura(){
    LoadComboClientes()
    LoadComboMedicamentos()
    document.getElementById("nueva-facturaFecha").value = new Date().toLocaleDateString('es-ES')
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
          <td>${medicamento.nombre}</td>
          <td>${medicamento.descripcion}</td>
          <td class="text-center">${medicamento.estado ? "Activo" : "Inactivo"}</td>
          <td class="text-center">
            <div class="btn-group me-2">
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


//Funcion que carga la tabla de facturas
function LoadFacturas() {
    fetch("https://localhost:7263/api/Factura")
      .then((response) => response.json())
      .then((facturas) => {
        const tbody = document.getElementById("tbody-facturas");
        tbody.innerHTML = ""; // Limpiar la tabla
  
        const modalEditarFactura = new bootstrap.Modal(document.getElementById('editar-factura-modal'))
        // const modalInfoFactura = new bootstrap.Modal(document.getElementById('info-factura-modal'))

        facturas.forEach((factura) => {
          const row = document.createElement("tr");
          const cliente = fetch("https://localhost:7263/api/Cliente/" + factura.idCliente)

          row.innerHTML = `
            <td class="d-none">${factura.id}</td>
            <td>${cliente.nombre + " " + cliente.apellido}</td>
            <td class="text-center">${factura.fecha}</td>
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
              modalEditarFactura.show()
              onclick = "LoadComboClientes()"
              onclick = "LoadComboMedicamentos()"
              document.getElementById("comboClientes").selected = factura.cliente
            console.log("Botón de editar presionado para:", factura);
            // Mostrar modal
          });

          // Agregar el evento para el boton de informacion de factura
          row.querySelector(".edit-btn").addEventListener("click", function(){
            modalEditarFactura.show()
            document.getElementById("comboClientes").selected = factura.cliente
          console.log("Botón de editar presionado para:", factura);
          // Mostrar modal
        });
          
          // Agregar el evento para el botón de eliminar
          row.querySelector(".delete-btn").addEventListener("click", function(){
            DeleteMedicamento(factura.id);
            console.log("Botón de eliminar presionado para:", factura);
            // Eliminar medicamento
          });
  
          tbody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error al cargar facturas:", error));
  }


function LoadClientes() {
  fetch("https://localhost:7263/api/Factura")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tbody-facturas");
      tbody.innerHTML = ""; // Limpiar la tabla
      data.forEach((factura) => {
        const cliente = fetch("https://localhost:7263/api/Cliente/" + factura.idCliente).
        then((response) => response.json()).
        then((clienteJson) => clienteJson.nombre + " " + clienteJson.apellido)
        console.log(cliente)
        const row = `
                  <tr>
                    <td>${cliente}</td>
                    <td>${factura.fecha}</td>
                    <td>
                      <button type="button" onclick="editMedicamento(${medicamento})" class="btn btn-outline-warning" data-bs-toggle="modal"
                                    data-bs-target="#editar-medicamento-modal">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button onclick="deleteMedicamento(${medicamento.id})" class="btn btn-outline-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
              `;
        tbody.innerHTML += row;
      });
    })
    .catch((error) => console.error("Error al cargar medicamentos:", error));
}

function LoadDetallesFactura() {
  fetch("https://localhost:7263/api/Factura")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tbody-facturas");
      tbody.innerHTML = ""; // Limpiar la tabla
      data.forEach((factura) => {
        const cliente = fetch("https://localhost:7263/api/Cliente/" + factura.idCliente).
        then((response) => response.json()).
        then((clienteJson) => clienteJson.nombre + " " + clienteJson.apellido)
        console.log(cliente)
        const row = `
                  <tr>
                    <td>${cliente}</td>
                    <td>${factura.fecha}</td>
                    <td>
                      <button type="button" onclick="editMedicamento(${medicamento})" class="btn btn-outline-warning" data-bs-toggle="modal"
                                    data-bs-target="#editar-medicamento-modal">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button onclick="deleteMedicamento(${medicamento.id})" class="btn btn-outline-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
              `;
        tbody.innerHTML += row;
      });
    })
    .catch((error) => console.error("Error al cargar medicamentos:", error));
}

//#endregion

//#region Entidades

// aca pretendia que hagamos los metodos para gestionar las entidades:
// UpdateMedicamento, DeleteMedicamento, CreateMedicamento

//#region Medicamento
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
      alert('medicamento actualizado correctamente')
      
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
  console.log(med)
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

//#region Factura
async function UpdateFactura(factura) {
    const response = await fetch('https://localhost:7263/api/Factura', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
    credentials: 'same-origin'
    
})
if(response.ok){
  alert('factura actualizada correctamente')
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

async function CreateFactura(factura){
const response = await fetch('https://localhost:7263/api/Factura', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
    credentials: 'same-origin'
    
})
if(response.ok){
  alert('factura Creada correctamente')
}

}
//#endregion Factura

//#region Clientes
async function UpdateCliente(factura) {
    const response = await fetch('https://localhost:7263/api/Cliente', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
    credentials: 'same-origin'
    
})
if(response.ok){
  alert('cliente actualizado correctamente')
}
}
async function DeleteCliente(id){
    const response = await fetch(`https://localhost:7263/api/Cliente/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
    credentials: 'same-origin'
    
})
if(response.ok){
  alert('cliente Eliminado correctamente')
}
}

async function CreateCliente(factura){
const response = await fetch('https://localhost:7263/api/Cliente', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
    credentials: 'same-origin'
    
})
if(response.ok){
  alert('cliente Creado correctamente')
}

}
//#endregion Clientes

//#endregion Entidades