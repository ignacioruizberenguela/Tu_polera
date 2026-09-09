// ==================================================
// CARRITO
// ==================================================

let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


// Contenedor
const contenedorCarrito =
    document.getElementById("carritoProductos");


// ==================================================
// MOSTRAR CARRITO
// ==================================================

function mostrarCarrito() {

    contenedorCarrito.innerHTML = "";


    // Carrito vacío
    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = `
            <div class="card">
                <div class="card-body text-center">

                    <h5>
                        Tu carrito está vacío
                    </h5>

                    <p class="text-muted">
                        Agrega productos para comenzar tu compra.
                    </p>

                    <a
                        href="productos.html"
                        class="btn btn-dark">

                        Ver productos

                    </a>

                </div>
            </div>
        `;


        actualizarTotales();

        return;
    }


    // Crear productos
    carrito.forEach(function(producto, indice) {

        const precio =
            Number(producto.precio);


        const descuento =
            Number(producto.descuento);


        const precioFinal =
            precio -
            (precio * descuento / 100);


        // Información del precio
        let informacionPrecio;


        if (descuento === 0) {

            informacionPrecio = `
                <p class="fw-bold">
                    Precio:
                    $${precio.toLocaleString("es-CL")}
                </p>
            `;

        } else {

            informacionPrecio = `

                <p>
                    Precio original:
                    <s>
                        $${precio.toLocaleString("es-CL")}
                    </s>
                </p>

                <p>
                    Descuento:
                    -${descuento}%
                </p>

                <p class="fw-bold">
                    Precio final:
                    $${precioFinal.toLocaleString("es-CL")}
                </p>

            `;
        }


        // Crear tarjeta
        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "card mb-3";


        tarjeta.innerHTML = `

            <div class="card-body">

                <div class="row align-items-center">

                    <!-- IMAGEN -->

                    <div class="col-md-3 text-center">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="img-fluid"
                            style="max-height: 150px;">

                    </div>


                    <!-- INFORMACIÓN -->

                    <div class="col-md-9">

                        <h5>
                            ${producto.nombre}
                        </h5>


                        <p>
                            <strong>
                                Talla:
                            </strong>

                            ${producto.talla || "Única"}

                        </p>


                        ${informacionPrecio}


                        <div>

                            <span>
                                Cantidad:
                            </span>


                            <button
                                class="btn btn-sm btn-secondary btn-restar">

                                −

                            </button>


                            <span class="mx-2 cantidad">

                                ${producto.cantidad}

                            </span>


                            <button
                                class="btn btn-sm btn-secondary btn-sumar">

                                +

                            </button>


                            <button
                                class="btn btn-sm btn-danger btn-eliminar ms-3">

                                Eliminar

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;


        contenedorCarrito.appendChild(tarjeta);


        // ==================================================
        // SUMAR
        // ==================================================

        tarjeta
            .querySelector(".btn-sumar")
            .addEventListener(
                "click",
                function() {

                    carrito[indice].cantidad++;

                    guardarCarrito();

                    mostrarCarrito();

                }
            );


        // ==================================================
        // RESTAR
        // ==================================================

        tarjeta
            .querySelector(".btn-restar")
            .addEventListener(
                "click",
                function() {

                    if (
                        carrito[indice].cantidad > 1
                    ) {

                        carrito[indice].cantidad--;

                        guardarCarrito();

                        mostrarCarrito();

                    }

                }
            );


        // ==================================================
        // ELIMINAR
        // ==================================================

        tarjeta
            .querySelector(".btn-eliminar")
            .addEventListener(
                "click",
                function() {

                    carrito.splice(indice, 1);

                    guardarCarrito();

                    mostrarCarrito();

                }
            );

    });


    actualizarTotales();
}


// ==================================================
// GUARDAR CARRITO
// ==================================================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// ==================================================
// TOTALES
// ==================================================

function actualizarTotales() {

    const carritoSubtotal =
        document.getElementById("carritoSubtotal");

    const carritoTotal =
        document.getElementById("carritoTotal");


    const costoEnvio = 3000;

    let subtotal = 0;


    carrito.forEach(function(producto) {

        const precio =
            Number(producto.precio);

        const descuento =
            Number(producto.descuento);


        const precioFinal =
            precio -
            (precio * descuento / 100);


        subtotal +=
            precioFinal *
            Number(producto.cantidad);

    });


    // Si el carrito está vacío,
    // no cobramos envío
    const total =
        carrito.length > 0
            ? subtotal + costoEnvio
            : 0;


    carritoSubtotal.textContent =
        "$" +
        subtotal.toLocaleString("es-CL");


    carritoTotal.textContent =
        "$" +
        total.toLocaleString("es-CL");

}


// ==================================================
// INICIO
// ==================================================

mostrarCarrito();