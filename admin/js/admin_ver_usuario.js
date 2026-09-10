document.addEventListener("DOMContentLoaded", function () {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const parametros = new URLSearchParams(window.location.search);

    const id = Number(parametros.get("id"));

    const usuario = usuarios.find(function (usuario) {
        return usuario.id === id;
    });


    // Si el usuario no existe

    if (!usuario) {

        alert("Usuario no encontrado.");

        window.location.href = "admin_usuarios.html";

        return;
    }


    // Mostrar los datos del usuario

    document.getElementById("nombreUsuario").textContent = usuario.nombre;

    document.getElementById("idUsuario").textContent = usuario.id;

    document.getElementById("usuarioNombre").textContent = usuario.nombre;

    document.getElementById("usuarioCorreo").textContent = usuario.correo;

    document.getElementById("usuarioRut").textContent = usuario.rut;

    document.getElementById("usuarioRegion").textContent = usuario.region;

    document.getElementById("usuarioComuna").textContent = usuario.comuna;

    document.getElementById("usuarioRol").textContent = usuario.rol;


    // Botón editar

    document.getElementById("btnEditar").href =
        "admin_editar_usuarios.html?id=" + usuario.id;


    // Nombre mostrado en el mensaje de eliminación

    document.getElementById("nombreUsuarioEliminar").textContent =
        usuario.nombre;


    // Botón confirmar eliminación

    document.getElementById("confirmarEliminar").addEventListener(
        "click",
        function () {

            const nuevosUsuarios = usuarios.filter(function (usuarioActual) {
                return usuarioActual.id !== id;
            });

            localStorage.setItem(
                "usuarios",
                JSON.stringify(nuevosUsuarios)
            );


            // Si el usuario eliminado tenía la sesión iniciada,
            // también se elimina la sesión.

            const usuarioActual = JSON.parse(
                localStorage.getItem("usuarioActual")
            );

            if (usuarioActual && usuarioActual.id === id) {

                localStorage.removeItem("usuarioActual");

            }


            window.location.href = "admin_usuarios.html";

        }
    );

});