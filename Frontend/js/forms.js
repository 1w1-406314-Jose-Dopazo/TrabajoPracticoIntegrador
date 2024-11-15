const localhost = "https://localhost:7263"

function LoadComboClientes(){
    fetch(localhost + "/api/cliente")
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
