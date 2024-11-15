const localhost = "https://localhost:7263/api/";

// aca pretendia que hagamos los metodos para gestionar las entidades:
// UpdateMedicamento, DeleteMedicamento, CreateMedicamento

//#region Medicamento
async function UpdateMedicamento(medicamento) {
        const response = await fetch('https://localhost:7263/api/Medicamento', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
        credentials: 'same-origin'
        
    })
    if(response.ok){
      alert('medicamento actualizado correctamente')
    }
}

// O delete entidad, como lo veas mejor
async function DeleteMedicamento(id){
    if (confirm("Eliminar medicamento?")) {
        const response = await fetch(`https://localhost:7263/api/Medicamento/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
            credentials: 'same-origin'
            
        })
    }
    if(response.ok){
      alert('medicamento Eliminado correctamente')
    }
}

async function CreateMedicamento(medicamento){
    const response = await fetch('https://localhost:7263/api/Medicamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
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