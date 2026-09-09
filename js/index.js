const productos =
JSON.parse(localStorage.getItem("productos")) || [];

const contenedor =
document.getElementById("productosDestacados");

const productosDestacados =
productos.slice(0, 6);

// Si no existen productos
if (productosDestacados.length === 0) {


contenedor.innerHTML = `
    <div class="carousel-item active">
        <div class="text-center py-5">
            <h4>No hay productos disponibles</h4>
            <p class="text-muted">
                Actualmente no existen productos registrados.
            </p>
        </div>
    </div>
`;


} else {


// Dividir los productos de 3 en 3
// para mostrar 3 productos por diapositiva

for (
    let i = 0;
    i < productosDestacados.length;
    i += 3
) {

    const grupo =
        productosDestacados.slice(i, i + 3);


    const item =
        document.createElement("div");

    item.className =
        "carousel-item" +
        (i === 0 ? " active" : "");


    const fila =
        document.createElement("div");

    fila.className =
        "row g-4 justify-content-center px-5";


    grupo.forEach(function(producto) {

        const precio =
            Number(producto.precio);

        const descuento =
            Number(producto.descuento) || 0;


        let precioFinal =
            precio -
            (precio * descuento / 100);


        let informacionPrecio;


        if (descuento === 0) {

            informacionPrecio = `
                <p class="fw-bold mb-3">
                    $${precio.toLocaleString("es-CL")}
                </p>
            `;

        } else {

            informacionPrecio = `
                <p class="mb-1">
                    <s>
                        $${precio.toLocaleString("es-CL")}
                    </s>

                    <span class="text-success ms-2">
                        -${descuento}%
                    </span>
                </p>

                <p class="fw-bold mb-3">
                    $${precioFinal.toLocaleString("es-CL")}
                </p>
            `;
        }


        let rutaImagen =
            producto.imagen || "imagenes/Placeholder.png";


        // Evitar ../ si el producto fue guardado
        // con una ruta ya preparada

        if (
            rutaImagen.startsWith("../")
        ) {

            rutaImagen =
                rutaImagen.substring(3);

        }


        const columna =
            document.createElement("div");

        columna.className =
            "col-12 col-md-4";


        columna.innerHTML = `

            <div class="card producto-destacado h-100 shadow-sm">

                <img
                    src="${rutaImagen}"
                    class="card-img-top"
                    alt="${producto.nombre}">

                <div class="card-body d-flex flex-column">

                    <h5 class="card-title">
                        ${producto.nombre}
                    </h5>

                    <p class="card-text text-muted">
                        ${producto.descripcion || ""}
                    </p>

                    ${informacionPrecio}

                    <div class="mt-auto">

                        <a
                            href="productos.html"
                            class="btn btn-dark w-100">

                            Ver productos

                        </a>

                    </div>

                </div>

            </div>

        `;


        fila.appendChild(columna);

    });


    item.appendChild(fila);

    contenedor.appendChild(item);

}


}
