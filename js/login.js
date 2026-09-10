document.addEventListener("DOMContentLoaded", function () {

    const formLogin = document.getElementById("formLogin");

    const correo = document.getElementById("correo");
    const password = document.getElementById("password");

    const errorCorreo = document.getElementById("errorCorreo");
    const errorPassword = document.getElementById("errorPassword");


    // =========================
    // FUNCIONES DE ERROR
    // =========================

    function mostrarError(campo, mensaje, mensajeError) {

        campo.classList.add("is-invalid");

        mensajeError.textContent = mensaje;
    }


    function quitarError(campo, mensajeError) {

        campo.classList.remove("is-invalid");

        mensajeError.textContent = "";
    }


    // =========================
    // INICIAR SESIÓN
    // =========================

    formLogin.addEventListener("submit", function (event) {

        event.preventDefault();


        // Quitar errores anteriores

        quitarError(correo, errorCorreo);
        quitarError(password, errorPassword);


        const correoIngresado = correo.value.trim();
        const passwordIngresada = password.value;


        // =========================
        // VALIDAR CORREO VACÍO
        // =========================

        if (correoIngresado === "") {

            mostrarError(
                correo,
                "Ingrese su correo electrónico.",
                errorCorreo
            );

            correo.focus();

            return;
        }


        // =========================
        // VALIDAR CONTRASEÑA VACÍA
        // =========================

        if (passwordIngresada === "") {

            mostrarError(
                password,
                "Ingrese su contraseña.",
                errorPassword
            );

            password.focus();

            return;
        }


        // =========================
        // OBTENER USUARIOS
        // =========================

        const usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];


        // =========================
        // BUSCAR USUARIO
        // =========================

        const usuarioEncontrado = usuarios.find(function (usuario) {

            return usuario.correo.toLowerCase() ===
                correoIngresado.toLowerCase();

        });


        if (!usuarioEncontrado) {

            mostrarError(
                correo,
                "El correo electrónico no está registrado.",
                errorCorreo
            );

            correo.focus();

            return;
        }


        // =========================
        // COMPROBAR CONTRASEÑA
        // =========================

        if (usuarioEncontrado.password !== passwordIngresada) {

            mostrarError(
                password,
                "La contraseña es incorrecta.",
                errorPassword
            );

            password.focus();

            return;
        }


        // =========================
        // GUARDAR SESIÓN
        // =========================

        localStorage.setItem(
            "usuarioActual",
            JSON.stringify(usuarioEncontrado)
        );


        // =========================
        // REDIRECCIONAR SEGÚN ROL
        // =========================

        if (usuarioEncontrado.rol === "administrador") {

            window.location.href =
                "admin/admin_index.html";

        }

        else if (usuarioEncontrado.rol === "vendedor") {

            window.location.href =
                "admin/admin_productos.html";

        }

        else {

            window.location.href =
                "usuario.html";

        }

    });


    // =========================
    // QUITAR ERROR AL ESCRIBIR
    // =========================

    correo.addEventListener("input", function () {

        quitarError(
            correo,
            errorCorreo
        );

    });


    password.addEventListener("input", function () {

        quitarError(
            password,
            errorPassword
        );

    });

});
