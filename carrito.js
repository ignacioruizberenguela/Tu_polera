const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(carrito);

const contenedorCarrito = document.getElementById("carritoProductos");

carrito.forEach(function(producto) {

    const precioFinal =
        producto.precio -
        (producto.precio * producto.descuento / 100);

    let informacionPrecio;

    if (producto.descuento == 0) {

        informacionPrecio = `
            <p class="fw-bold">
                Precio: $${producto.precio.toLocaleString("es-CL")}
            </p>
        `;

    } else {

        informacionPrecio = `
            <p>
                Precio original:
                <s>$${producto.precio.toLocaleString("es-CL")}</s>
            </p>

            <p>
                Descuento: -${producto.descuento}%
            </p>

            <p class="fw-bold">
                Precio final:
                $${precioFinal.toLocaleString("es-CL")}
            </p>
        `;
    }

    contenedorCarrito.innerHTML += `
        <div class="card mb-3">
            <div class="card-body">

                <h5>${producto.nombre}</h5>

                ${informacionPrecio}

                <div>
                    <span>Cantidad:</span>

                    <button class="btn btn-sm btn-secondary btn-restar">
                        −
                    </button>

                    <span class="mx-2">${producto.cantidad}</span>

                    <button class="btn btn-sm btn-secondary btn-sumar">
                        +
                    </button>

                    <button class="btn btn-sm btn-danger btn-eliminar ms-3">
                        Eliminar
                    </button>
                </div>

            </div>
        </div>
    `;

});


const botonesSumar = document.querySelectorAll(".btn-sumar");
const botonesRestar = document.querySelectorAll(".btn-restar");


botonesSumar.forEach(function(boton, indice) {

    boton.addEventListener("click", function() {

        carrito[indice].cantidad++;

        localStorage.setItem("carrito", JSON.stringify(carrito));

        location.reload();

    });

});


botonesRestar.forEach(function(boton, indice) {

    boton.addEventListener("click", function() {

        if (carrito[indice].cantidad > 1) {

            carrito[indice].cantidad--;

            localStorage.setItem("carrito", JSON.stringify(carrito));

            location.reload();

        }

    });

});

const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach(function(boton, indice) {

    boton.addEventListener("click", function() {

        carrito.splice(indice, 1);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        location.reload();

    });

});

const carritoSubtotal = document.getElementById("carritoSubtotal");
const carritoTotal = document.getElementById("carritoTotal");

const costoEnvio = 3000;

let subtotal = 0;

carrito.forEach(function(producto) {

    const precioFinal =
        producto.precio -
        (producto.precio * producto.descuento / 100);

    subtotal += precioFinal * producto.cantidad;

});

const total = subtotal + costoEnvio;

carritoSubtotal.textContent =
    "$" + subtotal.toLocaleString("es-CL");

carritoTotal.textContent =
    "$" + total.toLocaleString("es-CL");