



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
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        alert('Sesión cerrada');
        location.reload(); 
    });
    
    document.getElementById('sidebar-user').innerText = nombre
    
}

function login(url) {

    const nombre = document.getElementById('loginUsuario').value;
    const contraseña = document.getElementById('loginContraseña').value;

    const fetch(url, {
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
const boton = document.getElementById('FormBtn1')
boton.addEventListener('click',function(event){
    event.preventDefault();
    login('https://localhost:7263/api/Auth/login')
})