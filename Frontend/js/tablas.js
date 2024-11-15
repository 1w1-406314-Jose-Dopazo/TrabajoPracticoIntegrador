const localhost = "https://localhost:7263";

async function DeleteEntityById(url, id) {
  const response = await fetch(url + id);
  return await response.json();
}

// funcion que carga la tabla de medicamentos
function LoadMedicamentos() {
  fetch(localhost + "/api/Medicamento")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tbody-medicamentos");
      tbody.innerHTML = ""; // Limpiar la tabla
      data.forEach((med) => {
        const row = `
                  <tr>
                    <td>${med.nombre}</td>
                    <td>${med.descripcion}</td>
                    <td>${med.activo ? "Activo" : "Inactivo"}</td>
                    <td>
                      <div class="btn-group me-2">
                        <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#editar-factura-modal">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button onclick="deleteMedicamento(${med.id})" class="btn btn-outline-danger">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
              `;
        tbody.innerHTML += row;
      });
    })
    .catch((error) => console.error("Error al cargar medicamentos:", error));
}

//Funcion que carga la tabla de facturas
function LoadFacturas() {
  fetch(localhost + "/api/Factura")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tbody-facturas");
      tbody.innerHTML = ""; // Limpiar la tabla
      data.forEach((factura) => {
        const cliente = fetch(localhost + "api/Cliente/" + factura.idCliente).
        then((response) => response.json()).
        then((clienteJson) => clienteJson.nombre + " " + clienteJson.apellido)
        console.log(cliente)
        const row = `
                  <tr>
                    <td>${cliente}</td>
                    <td>${factura.fecha}</td>
                    <td>
                      <button type="button" onclick="metodo para cargar editar-factura-modal con datos de esta factura" class="btn btn-outline-warning" data-bs-toggle="modal"
                                    data-bs-target="#editar-factura-modal">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button onclick="deleteMedicamento(${medicamento.id})" class="btn btn-outline-danger">
                        <i class="bi bi-trash"></i>
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


function LoadClientes() {
  fetch(localhost + "/api/Factura")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tbody-facturas");
      tbody.innerHTML = ""; // Limpiar la tabla
      data.forEach((factura) => {
        const cliente = fetch(localhost + "api/Cliente/" + factura.idCliente).
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
  fetch(localhost + "/api/Factura")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tbody-facturas");
      tbody.innerHTML = ""; // Limpiar la tabla
      data.forEach((factura) => {
        const cliente = fetch(localhost + "api/Cliente/" + factura.idCliente).
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