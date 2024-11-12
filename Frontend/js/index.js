



function load_content(url, panelId, callback=null) {
    fetch(url)
        .then((res) => {
            return res.text(); 
        })
        .then((data) => {
            document.getElementById(panelId).innerHTML = data; 
            if(callback){
                callback();
            }
        })
        .catch(error => console.error("Error al cargar contenido: ", error));
}


function login_succes(nombre) {
    

    const newDisplay = `
        <div class="form-group" id="Form1">
            <i class="bi bi-person-circle" id="I1"></i>
            <h4>${nombre}</h4>
            <button class="btn btn-danger" id="logoutBtn">Cerrar sesión</button>
        </div>

        <div class="btn-group">

            <ul id="Lst1">

            <li>
            
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Medicamento
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick='load_content(".MedicamentoCrud/Consultar.html","container")'>Consultar</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".MedicamentoCrud/Editar.html","container")'>Editar</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".MedicamentoCrud/Nuevo.html","container")'>Nuevo</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".MedicamentoCrud/Eliminar.html","container")'>Eliminar</a></li>
            </ul>

            </li>

            <li>
            
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Factura
            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick='load_content(".FacturaCrud/Consultar.html","container")'>Consultar</a></li>
            <li><a class="dropdown-item" href="#" onclick='load_content(".FacturaCrud/Editar.html","container")'>Editar acción</a></li>
            <li><a class="dropdown-item" href="#" onclick='load_content(".FacturaCrud/Nuevo.html","container")'>Nuevo acción</a></li>
            <li><a class="dropdown-item" href="#" onclick='load_content(".FacturaCrud/Eliminar.html","container")'>Eliminar acción</a></li>
            </ul>
            
            </li>
            
            <li>
            
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Detalle-Factura
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick='load_content(".DetalleFacturaCrud/Consultar.html","container")'>Consultar</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".DetalleFacturaCrud/Editar.html","container")'>Editar acción</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".DetalleFacturaCrud/Nuevo.html","container")'>Nuevo acción</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".DetalleFacturaCrud/Eliminar.html","container")'>Eliminar acción</a></li>
            </ul>

            </li>

            <li>
            
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Usuario
            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick='load_content(".UsuarioCrud/Consultar.html","container")'>Consultar</a></li>
            <li><a class="dropdown-item" href="#" onclick='load_content(".UsuarioCrud/Editar.html","container")'>Editar acción</a></li>
            <li><a class="dropdown-item" href="#" onclick='load_content(".UsuarioCrud/Nuevo.html","container")'>Nuevo acción</a></li>
            <li><a class="dropdown-item" href="#" onclick='load_content(".UsuarioCrud/Eliminar.html","container")'>Eliminar acción</a></li>
            </ul>
            
            </li>

            <li>
            
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Tipo-Usuario
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick='load_content(".TipoUsuarioCrud/Consultar.html","container")'>Consultar</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".TipoUsuarioCrud/Editar.html","container")'>Editar acción</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".TipoUsuarioCrud/Nuevo.html","container")'>Nuevo acción</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".TipoUsuarioCrud/Eliminar.html","container")'>Eliminar acción</a></li>
            </ul>

            </li>


            <li>
            
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Cliente
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick='load_content(".ClienteCrud/Consultar.html","container")'>Consultar</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".ClienteCrud/Editar.html","container")'>Editar acción</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".ClienteCrud/Nuevo.html","container")'>Nuevo acción</a></li>
                <li><a class="dropdown-item" href="#" onclick='load_content(".ClienteCrud/Eliminar.html","container")'>Eliminar acción</a></li>
            </ul>

            </li>

        </ul>


            
        </div>

        
    `;

    
    const $menu = document.getElementById('Form0');
    $menu.innerHTML = newDisplay;

    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        alert('Sesión cerrada');
        location.reload(); 
    });

    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });

    
}

function login(url) {

    const nombre = document.getElementById('FormInput1').value;
    const contraseña = document.getElementById('FormInput2').value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: nombre,
            password: contraseña
        }),
        credentials: 'same-origin'  
        
    })
    .then(res => res.json())  
    .then(data => {
        console.log('Login exitoso', data);
        if(data != null){
            login_succes(nombre)
        }
    })
    .catch(error => {
        console.error('Error en el login:', error);
    });
}
