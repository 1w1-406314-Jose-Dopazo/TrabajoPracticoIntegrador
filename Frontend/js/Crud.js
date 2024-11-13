
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


async function GetEntityParameters(url){
  const entities =  await Get(url)
  Parameters = Object.keys(entities[0])
 return Parameters
}

async function NewEntity(url,obj){
  
  console.log(obj)
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
        credentials: 'same-origin'
        
    })
    .catch(error => console.error('Error:', error));
}



  function CreateMedicamento(){
     const nombreValue = document.getElementById('name').value;
     const estadoValue = document.getElementById('Estado').checked;
     const descripcionValue = document.getElementById('Medicamento-Description').value;
     let medicamento = {};
     medicamento.nombre = nombreValue;
     medicamento.estado = estadoValue;
     medicamento.descripcion = descripcionValue;

     return medicamento
}



  
