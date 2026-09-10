
document.addEventListener("DOMContentLoaded", function () {

    const usuarioGuardado = localStorage.getItem("usuarioActual");

    // Si no hay una sesión iniciada, volver al login
    if (!usuarioGuardado) {
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    // Mostrar nombre del usuario
    const saludo = document.getElementById("saludoUsuario");

    if (saludo) {
        saludo.textContent = "Hola, " + usuario.nombre;
    }

    // Mostrar opción de administración si es administrador
    const opcionAdmin = document.getElementById("opcionAdmin");

    if (opcionAdmin && usuario.rol === "administrador") {
        opcionAdmin.style.display = "block";
    }

    // Botón cerrar sesión
    const botonCerrarSesion = document.getElementById("cerrarSesion");

    if (botonCerrarSesion) {

        botonCerrarSesion.addEventListener("click", function (event) {

            event.preventDefault();

            localStorage.removeItem("usuarioActual");

            window.location.href = "index.html";

        });

    }

});

