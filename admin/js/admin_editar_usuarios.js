document.addEventListener("DOMContentLoaded", function () {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id"));

    const tituloPagina = document.getElementById("tituloPagina");
    const usuarioId = document.getElementById("usuarioId");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const rut = document.getElementById("rut");
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const password = document.getElementById("password");
    const rol = document.getElementById("rol");
    const formUsuario = document.getElementById("formUsuario");

    let usuarioEditar = null;


    // =========================
    // FUNCIONES DE ERROR
    // =========================

    function mostrarError(campo, mensaje, idError) {

        campo.classList.add("is-invalid");

        document.getElementById(idError).textContent = mensaje;
    }


    function quitarError(campo, idError) {

        campo.classList.remove("is-invalid");

        document.getElementById(idError).textContent = "";
    }


    // =========================
    // EDITAR
    // =========================

    if (id) {

        usuarioEditar = usuarios.find(function (usuario) {
            return usuario.id === id;
        });

        if (!usuarioEditar) {
            window.location.href = "admin_usuarios.html";
            return;
        }

        tituloPagina.textContent = "Editar usuario";

        usuarioId.value = usuarioEditar.id;
        nombre.value = usuarioEditar.nombre;
        correo.value = usuarioEditar.correo;
        rut.value = usuarioEditar.rut;
        password.value = usuarioEditar.password;
        rol.value = usuarioEditar.rol;

        region.value = usuarioEditar.region;

        region.dispatchEvent(new Event("change"));

        comuna.value = usuarioEditar.comuna;
    }


    // =========================
    // CREAR
    // =========================

    else {

        tituloPagina.textContent = "Crear usuario";

        usuarioId.value = "Se generará al guardar";
    }


    // =========================
    // GUARDAR
    // =========================

    formUsuario.addEventListener("submit", function (evento) {

        evento.preventDefault();


        // Quitar errores anteriores

        quitarError(nombre, "errorNombre");
        quitarError(correo, "errorCorreo");
        quitarError(rut, "errorRut");
        quitarError(region, "errorRegion");
        quitarError(comuna, "errorComuna");
        quitarError(password, "errorPassword");
        quitarError(rol, "errorRol");


        const nombreValor = nombre.value.trim();
        const correoValor = correo.value.trim();
        const rutValor = rut.value.trim();
        const regionValor = region.value;
        const comunaValor = comuna.value;
        const passwordValor = password.value;
        const rolValor = rol.value;


        // =========================
        // VALIDAR NOMBRE
        // =========================

        if (nombreValor.length < 2) {

            mostrarError(
                nombre,
                "El nombre debe tener al menos 2 caracteres.",
                "errorNombre"
            );

            nombre.focus();

            return;
        }


        // =========================
        // VALIDAR CORREO
        // =========================

        const correoValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoValor);

        if (!correoValido) {

            mostrarError(
                correo,
                "Ingresa un correo electrónico válido.",
                "errorCorreo"
            );

            correo.focus();

            return;
        }


        // =========================
        // CORREO DUPLICADO
        // =========================

        const correoExiste = usuarios.some(function (usuario) {

            return usuario.correo.toLowerCase() ===
                correoValor.toLowerCase()
                &&
                (!usuarioEditar ||
                    usuario.id !== usuarioEditar.id);

        });

        if (correoExiste) {

            mostrarError(
                correo,
                "Ya existe un usuario con ese correo.",
                "errorCorreo"
            );

            correo.focus();

            return;
        }


        // =========================
        // VALIDAR RUT
        // =========================

        const rutValido =
            /^\d{7,8}-[\dkK]$/.test(rutValor);

        if (!rutValido) {

            mostrarError(
                rut,
                "El RUT debe tener el formato 12345678-9.",
                "errorRut"
            );

            rut.focus();

            return;
        }


        // =========================
        // VALIDAR REGION
        // =========================

        if (regionValor === "") {

            mostrarError(
                region,
                "Selecciona una región.",
                "errorRegion"
            );

            region.focus();

            return;
        }


        // =========================
        // VALIDAR COMUNA
        // =========================

        if (comunaValor === "") {

            mostrarError(
                comuna,
                "Selecciona una comuna.",
                "errorComuna"
            );

            comuna.focus();

            return;
        }


        // =========================
        // VALIDAR CONTRASEÑA
        // =========================

        if (passwordValor.length < 6) {

            mostrarError(
                password,
                "La contraseña debe tener al menos 6 caracteres.",
                "errorPassword"
            );

            password.focus();

            return;
        }


        // =========================
        // VALIDAR ROL
        // =========================

        if (
            rolValor !== "cliente" &&
            rolValor !== "vendedor" &&
            rolValor !== "administrador"
        ) {

            mostrarError(
                rol,
                "Selecciona un rol válido.",
                "errorRol"
            );

            rol.focus();

            return;
        }


        // =========================
        // CREAR USUARIO
        // =========================

        if (!usuarioEditar) {

            let nuevoId = 1;

            if (usuarios.length > 0) {

                nuevoId =
                    Math.max(
                        ...usuarios.map(function (usuario) {
                            return usuario.id;
                        })
                    ) + 1;
            }


            const nuevoUsuario = {

                id: nuevoId,
                nombre: nombreValor,
                correo: correoValor,
                rut: rutValor,
                region: regionValor,
                comuna: comunaValor,
                password: passwordValor,
                rol: rolValor

            };


            usuarios.push(nuevoUsuario);


            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );


            window.location.href =
                "admin_ver_usuario.html?id=" + nuevoId;

        }


        // =========================
        // EDITAR USUARIO
        // =========================

        else {

            usuarioEditar.nombre = nombreValor;
            usuarioEditar.correo = correoValor;
            usuarioEditar.rut = rutValor;
            usuarioEditar.region = regionValor;
            usuarioEditar.comuna = comunaValor;
            usuarioEditar.password = passwordValor;
            usuarioEditar.rol = rolValor;


            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );


            const usuarioActual = JSON.parse(
                localStorage.getItem("usuarioActual")
            );


            if (
                usuarioActual &&
                usuarioActual.id === usuarioEditar.id
            ) {

                localStorage.setItem(
                    "usuarioActual",
                    JSON.stringify(usuarioEditar)
                );

            }


            window.location.href =
                "admin_ver_usuario.html?id=" +
                usuarioEditar.id;
        }

    });


    // =========================
    // QUITAR ERRORES AL ESCRIBIR
    // =========================

    nombre.addEventListener("input", function () {
        quitarError(nombre, "errorNombre");
    });


    correo.addEventListener("input", function () {
        quitarError(correo, "errorCorreo");
    });


    rut.addEventListener("input", function () {
        quitarError(rut, "errorRut");
    });


    region.addEventListener("change", function () {
        quitarError(region, "errorRegion");
    });


    comuna.addEventListener("change", function () {
        quitarError(comuna, "errorComuna");
    });


    password.addEventListener("input", function () {
        quitarError(password, "errorPassword");
    });


    rol.addEventListener("change", function () {
        quitarError(rol, "errorRol");
    });

});

