const localhost = "https://localhost:7263";

async function DeleteEntityById(url, id) {
  const response = await fetch(url + id);
  return await response.json();
}

function LoadMedicamentos() {
  fetch(localhost + "/api/Medicamento")
    .then((response) => response.json())
    .then((medicamentos) => {
      const tbody = document.getElementById("tbody-medicamentos");
      tbody.innerHTML = ""; // Limpiar la tabla

      const modalEditarMedicamento = new bootstrap.Modal(document.getElementById('editar-medicamento-modal'))

      medicamentos.forEach((medicamento) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
          <td>${medicamento.nombre}</td>
          <td>${medicamento.descripcion}</td>
          <td class="text-center">${medicamento.activo ? "Activo" : "Inactivo"}</td>
          <td class="text-center">
            <div class="btn-group me-2">
              <button type="button" class="btn btn-outline-warning edit-btn" data-bs-toggle="modal" data-bs-target="#editar-factura-modal">
                <i class="bi bi-pencil"></i>
              </button>
              <button onclick="deleteMedicamento(${medicamento.id})" class="btn btn-outline-danger delete-btn">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        `;

        // Agregar el evento para el botón de editar
        row.querySelector(".edit-btn").addEventListener("click", function(){
          modalEditarMedicamento.show()
          console.log("Botón de editar presionado para:", medicamento);
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
  fetch(localhost + "/api/Factura")
    .then((response) => response.json())
    .then((facturas) => {
      const tbody = document.getElementById("tbody-facturas");
      tbody.innerHTML = ""; // Limpiar la tabla
      facturas.forEach((factura) => {
        const cliente = fetch(localhost + "api/Cliente/" + factura.idCliente).
        then((response) => response.json()).
        then((clienteJson) => clienteJson.nombre + " " + clienteJson.apellido)
        console.log(cliente)
        const row = `
                  <tr>
                    <td class="d-none">${factura.id}</td>
                    <td>${cliente}</td>
                    <td>${factura.fecha}</td>
                    <td>
                      <button type="button" onclick="metodo para cargar editar-factura-modal con datos de esta factura" class="btn btn-outline-warning" data-bs-toggle="modal"
                                    data-bs-target="#editar-factura-modal">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button onclick="deleteFactura(${factura.id})" class="btn btn-outline-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                      <button onclick="infoFactura(${factura.id})" class="btn btn-outline-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
              `;
        // Agregar el evento para el botón de editar
        row.querySelector(".edit-btn").addEventListener("click", function(){
          // Aquí puedes configurar la lógica del modal antes de abrirlo, si es necesario
          console.log("Botón de editar presionado para:", medicamento);
          // Mostrar modal
        });
        
        // Agregar el evento para el botón de eliminar
        row.querySelector(".delete-btn").addEventListener("click", function(){
          // Aquí puedes configurar la lógica del modal antes de abrirlo, si es necesario
          console.log("Botón de eliminar presionado para:", medicamento);
          // Eliminar medicamento
        });
        tbody.appendChild(row);
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