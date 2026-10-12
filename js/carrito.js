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
            <div class="cart-vacio">

                <h5>
                    Tu carrito está vacío
                </h5>

                <p>
                    Agrega productos para comenzar tu compra.
                </p>

                <a
                    href="productos.html"
                    class="primary-btn">

                    Ver productos

                </a>

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
            "cart-row";


        tarjeta.innerHTML = `

            <div class="product__cart__item">

                <div class="product__cart__item__pic">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}">

                </div>

                <div class="product__cart__item__text">

                    <h6>
                        ${producto.nombre}
                    </h6>

                    <p>
                        <strong>
                            Talla:
                        </strong>

                        ${producto.talla || "Única"}
                    </p>

                    ${informacionPrecio}

                </div>

            </div>


            <div class="quantity__item">

                <div class="quantity-box">

                    <button
                        type="button"
                        class="btn-restar"
                        aria-label="Restar una unidad">

                        −

                    </button>

                    <span class="cantidad">
                        ${producto.cantidad}
                    </span>

                    <button
                        type="button"
                        class="btn-sumar"
                        aria-label="Sumar una unidad">

                        +

                    </button>

                </div>

            </div>


            <div class="cart__close">

                <button
                    type="button"
                    class="btn-eliminar"
                    aria-label="Eliminar producto">

                    <i class="fa fa-close"></i>

                </button>

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