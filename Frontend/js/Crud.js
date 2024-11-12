
async function Get(url){
    const response = await fetch(url)
    const entities = await response.json()
    return entities;
}

async function LoadTable(url){
    const entities = Get(url)
    const $container = document.getElementById('container')
    $container.appendChild(CreateTable(entities))
    console.log(entities)
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

function CreateTable(entities) {
    const table = document.createElement("table");
    const head = document.createElement("head");
    const headers = Object.keys(entities[0]);
    const headRow = document.createElement("tr");
    headers.forEach(header => {
        const th = document.createElement('th')
        th.innerHTML(header);
        headRow.appendChild(th);
    })
    head.appendChild(headRow);
    table.appendChild(head);

    const body = document.createElement("body")

    const dataRows = Object.values(entities);

    entities.forEach(entity => {
        const row = document.createElement("tr")
        Object.values(entity).forEach(value => {
            const td = document.createElement("td");
            td.innerHTML(value);
            row.appendChild(td);
        }
        )
        body.appendChild(row);
    });
    return table;
}
