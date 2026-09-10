document.addEventListener("DOMContentLoaded", function () {

    const tablaUsuarios = document.getElementById("tablaUsuarios");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    if (usuarios.length === 0) {

        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    No hay usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }


    usuarios.forEach(function (usuario) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.id}</td>

            <td>${usuario.nombre}</td>

            <td>${usuario.correo}</td>

            <td>${usuario.rut}</td>

            <td>${usuario.rol}</td>

            <td>
                <a
                    href="admin_ver_usuario.html?id=${usuario.id}"
                    class="btn btn-dark btn-sm text-white">

                    Datos

                </a>
            </td>
        `;

        tablaUsuarios.appendChild(fila);

    });

});