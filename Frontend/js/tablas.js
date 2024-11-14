const localhost = "https://localhost:7263"

async function GetEntities(url) {
    const response = await fetch(url);
    const entities = await response.json();
    return entities;
  }

//Funcion que carga la tabla de medicamentos, a replicar para las tablas que se quieran cargar
async function LoadMedicamentos() {
    const medicamentos = await GetEntities(localhost + '/api/Medicamento');
    const tBody = document.getElementById('tbody-medicamentos');
    tBody.innerHTML = ""
    medicamentos.forEach(medicamento => {
        const tRow = document.createElement("tr");

        // medicamento.id
        const tdId = document.createElement("td")
        tdId.innerText = medicamento.id;
        tdId.className = "d-none";
        tRow.appendChild(tdId);

        // medicamento.nombre
        const tdNombre = document.createElement("td")
        tdNombre.innerText = medicamento.nombre;
        tRow.appendChild(tdNombre);

        // medicamento.descripcion
        const tdDescripcion = document.createElement("td")
        tdDescripcion.innerText = medicamento.descripcion;
        tRow.appendChild(tdDescripcion);

        // medicamento.estado
        const tdEstado = document.createElement("td")
        tdEstado.innerText = medicamento.estado ? "Activo" : "Inactivo"
        tRow.appendChild(tdEstado);

        // botones
        const tdBotones = document.createElement("td");
        tdBotones.className = "text-center";

        // grupo de botones
        const btnGroup = document.createElement("div")
        btnGroup.className = "btn-group me-2"

        // boton de eliminar
        if (medicamento.estado) {
            const btnDelete = document.createElement("button")
            btnDelete.className = 'btn btn-outline-danger';
            btnDelete.type = "button"
            const iconDelete = document.createElement("i")
            iconDelete.className = 'bi bi-trash'
            btnDelete.appendChild(iconDelete)
            btnGroup.appendChild(btnDelete)
        }

        // boton de actualizar
        const btnUpdate = document.createElement("button")
        btnUpdate.className = 'btn btn-outline-warning';
        btnUpdate.type = "button"
        const iconUpdate = document.createElement("i")
        iconUpdate.className = 'bi bi-pencil-square'
        btnUpdate.appendChild(iconUpdate)
        btnGroup.appendChild(btnUpdate)
        tdBotones.appendChild(btnGroup)
        tRow.appendChild(tdBotones);
        tBody.appendChild(tRow); 
    });
}

//Funcion que carga la tabla de facturas
async function LoadFacturas() {
    const facturas = await GetEntities( localhost + '/api/Factura');
    const tBody = document.getElementById('tbody-facturas');
    tBody.innerHTML = ""
    facturas.forEach(factura => {
        const tRow = document.createElement("tr");

        // factura.id
        const tdId = document.createElement("td")
        tdId.innerText = factura.id;
        tdId.className = "d-none";
        tRow.appendChild(tdId);

        // nombre del cliente
        const tdCliente = document.createElement("td")
        // TODO: agregar en este campo el nombre del cliente
        tdCliente.innerText = "NOMBREDELCLIENTE";
        tRow.appendChild(tdCliente);

        // factura.fecha
        const tdFecha = document.createElement("td")
        tdFecha.innerText = factura.fecha;
        tRow.appendChild(tdDescripcion);

        // botones
        const tdBotones = document.createElement("td");
        tdBotones.className = "text-center";

        // grupo de botones
        const btnGroup = document.createElement("div")
        btnGroup.className = "btn-group me-2"

        // boton de eliminar
        if (medicamento.estado) {
            const btnDelete = document.createElement("button")
            btnDelete.className = 'btn btn-outline-danger';
            btnDelete.type = "button"
            btnDelete.addEventListener('click', () => {
                console.log(medicamento.nombre)
                if (confirm("Está por eliminar un medicamento, confirmar?")) {
                    // metodo para eliminar medicamento por id
                    LoadMedicamentos();
                }
            });
            const iconDelete = document.createElement("i")
            iconDelete.className = 'bi bi-trash'
            btnDelete.appendChild(iconDelete)
            btnGroup.appendChild(btnDelete)
        }

        // boton de actualizar
        const btnUpdate = document.createElement("button")
        btnUpdate.className = 'btn btn-outline-warning';
        btnUpdate.type = "button"
        const iconUpdate = document.createElement("i")
        iconUpdate.className = 'bi bi-pencil-square'
        btnUpdate.appendChild(iconUpdate)
        btnGroup.appendChild(btnUpdate)
        tdBotones.appendChild(btnGroup)
        tRow.appendChild(tdBotones);
        tBody.appendChild(tRow); 
    });
}