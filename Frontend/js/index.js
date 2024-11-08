function load_content(url,panelId)
{
    fetch(url)
    .then((res)=>
        {
            return res.text  
        })
    .then((data)=>
        {
            const text=data.text
            document.getElementById(panelId).innerHTML()=text
        })
}

function login_succes()
{
    const nombre = document.getElementById('FormInput1').value
    const contraseña = document.getElementById('FormInput2').value
    const newDisplay = 
            `
            <div class="form-group" id="Form1">
                <i class="bi bi-person-circle" id="I1"></i>
                <h4>${nombre}</h4>
                <btn class='btn btn-danger'>cerrar sesion</btn>

            </div>

            <ul id="Lst1">
                <li><button class="dropdown-item" type="button" id="lst-btn-1">Opcion 1</button></li>
                <li><button class="dropdown-item" type="button" id="lst-btn-1">Opcion 2</button></li>
                <li><button class="dropdown-item" type="button" id="lst-btn-1">Opcion 3</button></li>
            </ul>
            `

    const $menu = document.getElementById('Form0')

    $menu.innerHTML = newDisplay
}
