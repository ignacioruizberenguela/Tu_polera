document.addEventListener("DOMContentLoaded", function () {

    // El botón de cuenta aparece en la cabecera y en el menú móvil
    const botonesCuenta = document.querySelectorAll("#botonCuenta, .boton-cuenta");

    if (botonesCuenta.length === 0) {
        return;
    }

    const usuarioActual = localStorage.getItem("usuarioActual");

    botonesCuenta.forEach(function (botonCuenta) {

        if (usuarioActual) {

            botonCuenta.textContent = "Mi cuenta";
            botonCuenta.href = "usuario.html";

        } else {

            botonCuenta.textContent = "Registro";
            botonCuenta.href = "registro.html";

        }

    });

});