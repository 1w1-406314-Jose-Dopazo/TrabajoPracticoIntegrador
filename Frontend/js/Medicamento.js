async function Get(url){
    const response = await fetch('https://localhost:7263/api/Medicamento')
    const medicamentos = await response.json()
    const $tbody = document.getElementById('tbody')
    let tbody = ''
    console.log(medicamentos)
    medicamentos.forEach(element => {
        tbody+=`
        <tr>
            <td style='display: none'>
            ${element.id}
            </td>
            <td>
            ${element.nombre}
            </td>
            <td>
            ${element.descripcion}
            </td>
            <td>
            ${element.estado}
            </td>
            <td>
            <btn class='btn btn-danger'>Eliminar</btn>
            </td>
        </tr>
        `

    });
    $tbody.innerHTML=tbody
}
function New(url,nombre,descripcion,estado){
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            username: nombre,
            password: contraseña
        }),
        credentials: 'same-origin'
        
    })
}
