document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".registro-container form");

    if (!form) return;


    form.addEventListener("submit", (e) => {

        e.preventDefault();


        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const rut = document.getElementById("rut");
        const region = document.getElementById("region");
        const comuna = document.getElementById("comuna");
        const password = document.getElementById("password");
        const confirmar = document.getElementById("confirmar");
        const terminos = document.querySelector(".terminos input");


        let esValido = true;


        // VALIDAR NOMBRE

        if (nombre.value.trim().length < 3) {

            marcarError(nombre);
            esValido = false;

        } else {

            marcarExito(nombre);
        }


        // VALIDAR CORREO

        if (!validarCorreo(correo.value.trim())) {

            marcarError(correo);
            esValido = false;

        } else {

            marcarExito(correo);
        }


        // VALIDAR RUT

        if (!validarRutChileno(rut.value.trim())) {

            marcarError(rut);
            esValido = false;

        } else {

            marcarExito(rut);
        }


        // VALIDAR REGION

        if (region.value === "") {

            marcarError(region);
            esValido = false;

        } else {

            marcarExito(region);
        }


        // VALIDAR COMUNA

        if (comuna.value === "" || comuna.disabled) {

            marcarError(comuna);
            esValido = false;

        } else {

            marcarExito(comuna);
        }


        // VALIDAR CONTRASEÑA

        if (password.value.length < 6) {

            marcarError(password);
            esValido = false;

        } else {

            marcarExito(password);
        }


        // CONFIRMAR CONTRASEÑA

        if (
            confirmar.value === "" ||
            confirmar.value !== password.value
        ) {

            marcarError(confirmar);
            esValido = false;

        } else {

            marcarExito(confirmar);
        }


        // TERMINOS

        if (!terminos.checked) {

            alert("Debes aceptar los términos y condiciones.");

            esValido = false;
        }


        // GUARDAR USUARIO

        if (esValido) {

            let usuarios =
                JSON.parse(localStorage.getItem("usuarios")) || [];


            // COMPROBAR CORREO

            const correoExiste = usuarios.some(
                usuario =>
                    usuario.correo.toLowerCase() ===
                    correo.value.trim().toLowerCase()
            );


            if (correoExiste) {

                alert("Ya existe un usuario registrado con ese correo.");

                marcarError(correo);

                return;
            }


            // CREAR ID

            let nuevoId = 1;

            if (usuarios.length > 0) {

                nuevoId =
                    Math.max(
                        ...usuarios.map(usuario => usuario.id)
                    ) + 1;
            }


            // CREAR USUARIO

            const nuevoUsuario = {

                id: nuevoId,

                nombre: nombre.value.trim(),

                correo: correo.value.trim(),

                rut: rut.value.trim(),

                region: region.value,

                comuna: comuna.value,

                password: password.value,

                rol: "cliente"
            };


            // GUARDAR

            usuarios.push(nuevoUsuario);

            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );


            alert("¡Cuenta creada exitosamente!");


            form.reset();


            comuna.innerHTML =
                '<option value="">Seleccione primero una región</option>';

            comuna.disabled = true;


            limpiarEstilos();
        }
    });
});


// ==========================================
// VALIDAR CORREO
// ==========================================

function validarCorreo(email) {

    const re =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(email);
}


// ==========================================
// VALIDAR RUT
// ==========================================

function validarRutChileno(rut) {

    rut = rut
        .replace(/\./g, "")
        .replace("-", "")
        .toUpperCase();


    if (rut.length < 8) return false;


    const cuerpo = rut.slice(0, -1);

    const dv = rut.slice(-1);


    let suma = 0;

    let multiplo = 2;


    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            parseInt(cuerpo.charAt(i)) *
            multiplo;


        multiplo =
            multiplo < 7
                ? multiplo + 1
                : 2;
    }


    let dvEsperado =
        11 - (suma % 11);


    if (dvEsperado === 11) {

        dvEsperado = "0";

    } else if (dvEsperado === 10) {

        dvEsperado = "K";

    } else {

        dvEsperado =
            dvEsperado.toString();
    }


    return dv === dvEsperado;
}


// ==========================================
// MARCAR ERROR
// ==========================================

function marcarError(input) {

    input.style.borderColor =
        "#dc3545";

    input.style.boxShadow =
        "0 0 0 2px rgba(220, 53, 69, 0.25)";
}


// ==========================================
// MARCAR ÉXITO
// ==========================================

function marcarExito(input) {

    input.style.borderColor =
        "#198754";

    input.style.boxShadow =
        "none";
}


// ==========================================
// LIMPIAR ESTILOS
// ==========================================

function limpiarEstilos() {

    const inputs =
        document.querySelectorAll(
            ".registro-container input, .registro-container select"
        );


    inputs.forEach(input => {

        input.style.borderColor =
            "#d4d4d8";

        input.style.boxShadow =
            "none";
    });
}