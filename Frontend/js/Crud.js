
async function Get(url){
    const response = await fetch(url)
    const entities = await response.json()
    return entities;
}

async function LoadTable(url){
    const entities =  await Get(url)
    const $container = document.getElementById('container')
    const table = await CreateTable(entities);
    $container.appendChild(table)
}

async function CreateTable(entities) {
  console.log(entities);

  const table = document.createElement("table");
  const thead = document.createElement("thead");

  console.log(entities[0]);

  const headers = Object.keys(entities[0]);
  const titles = headers.map(e=>e.toUpperCase())
  const headRow = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header.toUpperCase();
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  const dataRows = Object.values(entities);

  entities.forEach((entity) => {
    const row = document.createElement("tr");
    Object.values(entity).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  return table;
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
