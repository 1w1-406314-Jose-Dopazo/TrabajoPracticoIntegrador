const localhost = "https://localhost:7263/api/";

// aca pretendia que hagamos los metodos para gestionar las entidades:
// UpdateMedicamento, DeleteMedicamento, CreateMedicamento

//#region Medicamento
async function UpdateMedicamento() {

    let med ={};
    med.id = medicamento.id
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

async function CreateMedicamento(){
  let med ={};
    med.nombre=document.getElementById('nuevo-medicamentoNombre').value
    med.descripcion=document.getElementById('nuevo-medicamentoDescripcion').value
    med.estado=document.getElementById('nuevo-medicamentoEstado').value
    console.log('holaaaaaa')
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