document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".registro-container form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el envío automático
    
    // Obtener los valores de las entradas
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const rut = document.getElementById("rut");
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const password = document.getElementById("password");
    const confirmar = document.getElementById("confirmar");
    const terminos = document.querySelector(".terminos input");

    let esValido = true;

    // 1. Validar Nombre Completo (mínimo 3 caracteres)
    if (nombre.value.trim().length < 3) {
      marcarError(nombre, "Ingresa tu nombre completo.");
      esValido = false;
    } else {
      marcarExito(nombre);
    }

    // 2. Validar Correo Electrónico
    if (!validarCorreo(correo.value.trim())) {
      marcarError(correo, "Ingresa un correo electrónico válido.");
      esValido = false;
    } else {
      marcarExito(correo);
    }

    // 3. Validar RUT (Formato y Módulo 11)
    if (!validarRutChileno(rut.value.trim())) {
      marcarError(rut, "RUT inválido (ej: 12.345.678-9).");
      esValido = false;
    } else {
      marcarExito(rut);
    }

    // 4. Validar Región y Comuna
    if (region.value === "" || region.selectedIndex === 0) {
      marcarError(region, "Selecciona una región.");
      esValido = false;
    } else {
      marcarExito(region);
    }

    if (comuna.value === "" || comuna.selectedIndex === 0 || comuna.disabled) {
      marcarError(comuna, "Selecciona una comuna.");
      esValido = false;
    } else {
      marcarExito(comuna);
    }

    // 5. Validar Contraseña (mínimo 6 caracteres)
    if (password.value.length < 6) {
      marcarError(password, "La contraseña debe tener al menos 6 caracteres.");
      esValido = false;
    } else {
      marcarExito(password);
    }

    // 6. Confirmar Contraseña
    if (confirmar.value === "" || confirmar.value !== password.value) {
      marcarError(confirmar, "Las contraseñas no coinciden.");
      esValido = false;
    } else {
      marcarExito(confirmar);
    }

    // 7. Términos y condiciones
    if (!terminos.checked) {
      alert("Debes aceptar los términos y condiciones.");
      esValido = false;
    }

    // Si todo está correcto
    if (esValido) {
      alert("¡Cuenta creada exitosamente!");
      form.reset();
      limpiarEstilos();
    }
  });
});

/* ==========================================
   FUNCIONES AUXILIARES
   ========================================== */

// Formato de correo con Expresión Regular
function validarCorreo(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Algoritmo de validación del RUT chileno (Módulo 11)
function validarRutChileno(rut) {
  rut = rut.replace(/\./g, "").replace("-", "").toUpperCase();
  if (rut.length < 8) return false;

  const cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = dvEsperado.toString();

  return dv === dvEsperado;
}

// Marcar campos con error visual
function marcarError(input, mensaje) {
  input.style.borderColor = "#dc3545";
  input.style.boxShadow = "0 0 0 2px rgba(220, 53, 69, 0.25)";
}

// Marcar campos válidos
function marcarExito(input) {
  input.style.borderColor = "#198754";
  input.style.boxShadow = "none";
}

// Limpiar bordes al reiniciar
function limpiarEstilos() {
  const inputs = document.querySelectorAll(".registro-container input, .registro-container select");
  inputs.forEach(input => {
    input.style.borderColor = "#d4d4d8";
    input.style.boxShadow = "none";
  });
}