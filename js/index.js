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


        let rutaImagen =
            producto.imagen || "Imagenes/Placeholder.png";


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


        const claseSale =
            descuento > 0 ? " sale" : "";


        const etiqueta =
            descuento > 0
                ? `<span class="label">-${descuento}%</span>`
                : "";


        columna.innerHTML = `

            <div class="product__item${claseSale}">

                <div class="product__item__pic">

                    ${etiqueta}

                    <img
                        src="${rutaImagen}"
                        alt="${producto.nombre}">

                </div>

                <div class="product__item__text">

                    <h6>
                        ${producto.nombre}
                    </h6>

                    <a
                        href="productos.html"
                        class="add-cart">

                        + Ver productos

                    </a>

                    <p class="producto-desc">
                        ${producto.descripcion || ""}
                    </p>

                    ${informacionPrecio}

                </div>

            </div>

        `;


        fila.appendChild(columna);

    });


    item.appendChild(fila);

    contenedor.appendChild(item);

}


}
