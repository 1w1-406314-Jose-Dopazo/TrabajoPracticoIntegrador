



function load_content(url, panelId) {
    fetch(url)
        .then((res) => {
            return res.text(); // Asegúrate de llamar a .text() como una función
        })
        .then((data) => {
            document.getElementById(panelId).innerHTML = data; // Usa innerHTML directamente
        })
        .catch(error => console.error("Error al cargar contenido: ", error));
}

// Esta función se ejecuta después de iniciar sesión
function login_succes() {
    const nombre = document.getElementById('FormInput1').value;
    const contraseña = document.getElementById('FormInput2').value;

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

    // Insertamos el contenido en el contenedor de menú
    const $menu = document.getElementById('Form0');
    $menu.innerHTML = newDisplay;

    // Añadir evento de logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        alert('Sesión cerrada');
        location.reload(); // Recarga la página al cerrar sesión
    });

    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });
}