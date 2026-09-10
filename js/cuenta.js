document.addEventListener("DOMContentLoaded", function () {

    const botonCuenta = document.getElementById("botonCuenta");

    if (!botonCuenta) {
        return;
    }

    const usuarioActual = localStorage.getItem("usuarioActual");

    if (usuarioActual) {

        botonCuenta.textContent = "Mi cuenta";
        botonCuenta.href = "usuario.html";

    } else {

        botonCuenta.textContent = "Registro";
        botonCuenta.href = "registro.html";

    }

});