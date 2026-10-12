const productos =
    JSON.parse(localStorage.getItem("productos")) || [];

const contenedorProductos =
    document.getElementById("contenedorProductos");

const filtroTipo =
    document.getElementById("filtroTipo");

const filtroColor =
    document.getElementById("filtroColor");

const filtroDescuento =
    document.getElementById("filtroDescuento");

const modalNombre =
    document.getElementById("modalNombre");

const modalImagen =
    document.getElementById("modalImagen");

const modalDescripcion =
    document.getElementById("modalDescripcion");

const modalPrecio =
    document.getElementById("modalPrecio");

const modalTalla =
    document.getElementById("modalTalla");

const btnAgregarCarrito =
    document.getElementById("btnAgregarCarrito");

let productoSeleccionado = null;


// ========================================
// MOSTRAR PRODUCTOS
// ========================================

function mostrarProductos(listaProductos) {

    contenedorProductos.innerHTML = "";

    if (listaProductos.length === 0) {

        contenedorProductos.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">
                    No hay productos disponibles.
                </p>
            </div>
        `;

        return;
    }


    listaProductos.forEach(function(producto) {

        const precio =
            Number(producto.precio);

        const descuento =
            Number(producto.descuento) || 0;

        const precioFinal =
            precio - (precio * descuento / 100);


        let informacionPrecio;


        if (descuento === 0) {

            informacionPrecio = `
                <div class="precio">
                    <h5>
                        $${precio.toLocaleString("es-CL")}
                    </h5>
                </div>
            `;

        } else {

            informacionPrecio = `
                <div class="precio">
                    <h5>
                        <s class="precio-antes">$${precio.toLocaleString("es-CL")}</s>$${precioFinal.toLocaleString("es-CL")}
                    </h5>
                </div>
            `;
        }


        const columna =
            document.createElement("div");

        columna.className =
            "col-12 col-md-6 col-lg-4";


        const claseSale =
            descuento > 0 ? " sale" : "";


        const etiqueta =
            descuento > 0
                ? `<span class="label">-${descuento}%</span>`
                : "";


        columna.innerHTML = `
            <div
                class="product__item producto${claseSale}"
                data-id="${producto.id}">

                <div class="product__item__pic">

                    ${etiqueta}

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}">

                </div>

                <div class="product__item__text">

                    <h6>
                        ${producto.nombre}
                    </h6>

                    <button
                        type="button"
                        class="add-cart btn-ver-producto"
                        data-bs-toggle="modal"
                        data-bs-target="#modalProducto">

                        + Ver producto

                    </button>

                    <p class="producto-desc">
                        ${producto.descripcion || ""}
                    </p>

                    ${informacionPrecio}

                </div>

            </div>
        `;


        contenedorProductos.appendChild(columna);

    });


    activarBotonesProducto();
}


// ========================================
// BOTÓN VER PRODUCTO
// ========================================

function activarBotonesProducto() {

    const botonesProducto =
        document.querySelectorAll(".btn-ver-producto");


    botonesProducto.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const tarjeta =
                boton.closest(".producto");


            const id =
                Number(tarjeta.dataset.id);


            productoSeleccionado =
                productos.find(function(producto) {

                    return producto.id === id;

                });


            if (!productoSeleccionado) {
                return;
            }


            // Nombre

            modalNombre.textContent =
                productoSeleccionado.nombre;


            // Descripción

            modalDescripcion.textContent =
                productoSeleccionado.descripcion || "";


            // Imagen

            modalImagen.src =
                productoSeleccionado.imagen;

            modalImagen.alt =
                productoSeleccionado.nombre;


            // Precio

            const precio =
                Number(productoSeleccionado.precio);

            const descuento =
                Number(productoSeleccionado.descuento) || 0;


            if (descuento === 0) {

                modalPrecio.textContent =
                    "$" + precio.toLocaleString("es-CL");

            } else {

                const precioFinal =
                    precio - (precio * descuento / 100);


                modalPrecio.innerHTML =
                    "-" +
                    descuento +
                    "% | " +
                    "<s>$" +
                    precio.toLocaleString("es-CL") +
                    "</s> | $" +
                    precioFinal.toLocaleString("es-CL");
            }


            // Tallas

            modalTalla.innerHTML = "";


            const tallas =
                productoSeleccionado.tallas || [];


            tallas.forEach(function(talla) {

                const opcion =
                    document.createElement("option");

                opcion.value =
                    talla;

                opcion.textContent =
                    talla;

                modalTalla.appendChild(opcion);

            });

        });

    });

}


// ========================================
// AGREGAR AL CARRITO
// ========================================

btnAgregarCarrito.addEventListener(
    "click",
    function() {

        if (!productoSeleccionado) {
            return;
        }


        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        const talla =
            modalTalla.value;


        const productoExistente =
            carrito.find(function(producto) {

                return (
                    producto.id === productoSeleccionado.id &&
                    producto.talla === talla
                );

            });


        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            const productoCarrito = {

                id:
                    productoSeleccionado.id,

                nombre:
                    productoSeleccionado.nombre,

                precio:
                    Number(productoSeleccionado.precio),

                descuento:
                    Number(productoSeleccionado.descuento) || 0,

                imagen:
                    productoSeleccionado.imagen,

                talla:
                    talla,

                cantidad:
                    1
            };


            carrito.push(productoCarrito);
        }


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById("modalProducto")
            );


        if (modal) {
            modal.hide();
        }

    }
);


// ========================================
// FILTRAR PRODUCTOS
// ========================================

function filtrarProductos() {

    const tipoSeleccionado =
        filtroTipo.value;

    const colorSeleccionado =
        filtroColor.value;

    const descuentoSeleccionado =
        filtroDescuento.value;


    const productosFiltrados =
        productos.filter(function(producto) {


            // FILTRO POR CATEGORÍA

            const coincideTipo =
                tipoSeleccionado === "todos" ||
                producto.categoria === tipoSeleccionado;


            // FILTRO POR COLOR

            const coincideColor =
                colorSeleccionado === "todos" ||
                producto.color === colorSeleccionado;


            // FILTRO POR DESCUENTO

            const coincideDescuento =
                descuentoSeleccionado === "todos" ||
                Number(producto.descuento) >=
                Number(descuentoSeleccionado);


            return (
                coincideTipo &&
                coincideColor &&
                coincideDescuento
            );

        });


    mostrarProductos(productosFiltrados);
}


// ========================================
// EVENTOS DE LOS FILTROS
// ========================================

filtroTipo.addEventListener(
    "change",
    filtrarProductos
);

filtroColor.addEventListener(
    "change",
    filtrarProductos
);

filtroDescuento.addEventListener(
    "change",
    filtrarProductos
);


// ========================================
// CATEGORÍA RECIBIDA DESDE EL ÍNDICE
// ========================================

const parametros =
    new URLSearchParams(
        window.location.search
    );


const categoriaURL =
    parametros.get("categoria");


if (categoriaURL) {

    filtroTipo.value =
        categoriaURL;

    filtrarProductos();

} else {

    mostrarProductos(productos);

}