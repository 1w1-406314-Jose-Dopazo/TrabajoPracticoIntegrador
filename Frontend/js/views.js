function loadView(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("view-container").innerHTML = data;
    })
    .catch((error) => console.error("Error al cargar la vista:", error));
}

function login(url) {
  const nombre = document.getElementById("FormInput1").value;
  const contraseña = document.getElementById("FormInput2").value;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: nombre,
      password: contraseña,
    }),
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Login exitoso", data);
      if (data != null) {
        login_succes(nombre);
      }
    })
    .catch((error) => {
      console.error("Error en el login:", error);
    });
}
const boton = document.getElementById("FormBtn1");
boton.addEventListener("click", function (event) {
  event.preventDefault();
  login("https://localhost:7263/api/Auth/login");
});
