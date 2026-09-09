// Obtener el ID desde la URL
const parametros =
    new URLSearchParams(window.location.search);

const id =
    Number(parametros.get("id"));


// Obtener productos desde localStorage
const productos =
    JSON.parse(localStorage.getItem("productos")) || [];


// Buscar producto
const producto =
    productos.find(function(producto) {
        return producto.id === id;
    });


// --------------------------------------------------
// ELEMENTOS DE LA PÁGINA
// --------------------------------------------------

const idProducto =
    document.getElementById("idProducto");

const nombreProducto =
    document.getElementById("nombreProducto");

const categoriaProducto =
    document.getElementById("categoriaProducto");

const precioProducto =
    document.getElementById("precioProducto");

const colorProducto =
    document.getElementById("colorProducto");

const descuentoProducto =
    document.getElementById("descuentoProducto");

const tallasProducto =
    document.getElementById("tallasProducto");

const descripcionProducto =
    document.getElementById("descripcionProducto");

const imagenProducto =
    document.getElementById("imagenProducto");

const btnEditar =
    document.getElementById("btnEditar");

const btnEliminar =
    document.getElementById("btnEliminar");


// --------------------------------------------------
// CAMPOS ESPECIALES
// --------------------------------------------------

const campoMangaCorta =
    document.getElementById("campoMangaCorta");

const campoCapucha =
    document.getElementById("campoCapucha");

const campoTipoGorro =
    document.getElementById("campoTipoGorro");

const mangaCortaProducto =
    document.getElementById("mangaCortaProducto");

const capuchaProducto =
    document.getElementById("capuchaProducto");

const tipoGorroProducto =
    document.getElementById("tipoGorroProducto");


// --------------------------------------------------
// ELEMENTOS DEL MODAL
// --------------------------------------------------

const nombreProductoEliminar =
    document.getElementById("nombreProductoEliminar");

const confirmarEliminar =
    document.getElementById("confirmarEliminar");


// --------------------------------------------------
// MOSTRAR PRODUCTO
// --------------------------------------------------

if (producto) {

    // --------------------------------------------------
    // DATOS GENERALES
    // --------------------------------------------------

    idProducto.textContent =
        producto.id;

    nombreProducto.textContent =
        producto.nombre;

    categoriaProducto.textContent =
        producto.categoria;

    precioProducto.textContent =
        producto.precio.toLocaleString("es-CL");

    colorProducto.textContent =
        producto.color;

    descuentoProducto.textContent =
        producto.descuento;


    // --------------------------------------------------
    // TALLAS
    // --------------------------------------------------

    if (
        producto.tallas &&
        producto.tallas.length > 0
    ) {

        tallasProducto.textContent =
            producto.tallas.join(", ");

    } else {

        tallasProducto.textContent =
            "Sin tallas";
    }


    // --------------------------------------------------
    // DESCRIPCIÓN
    // --------------------------------------------------

    descripcionProducto.textContent =
        producto.descripcion;


    // --------------------------------------------------
    // IMAGEN
    // --------------------------------------------------

    let rutaImagen =
        producto.imagen;

    if (rutaImagen) {

        if (rutaImagen.startsWith("../")) {

            imagenProducto.src =
                rutaImagen;

        } else {

            imagenProducto.src =
                "../" + rutaImagen;
        }

    } else {

        imagenProducto.style.display =
            "none";
    }


    // --------------------------------------------------
    // BOTÓN EDITAR
    // --------------------------------------------------

    btnEditar.href =
        `editar_producto.html?id=${producto.id}`;


    // --------------------------------------------------
    // CAMPOS ESPECÍFICOS
    // --------------------------------------------------

    if (producto.categoria === "poleras") {

        campoMangaCorta.style.display =
            "block";

        campoCapucha.style.display =
            "none";

        campoTipoGorro.style.display =
            "none";

        mangaCortaProducto.textContent =
            producto.manga_corta === "si"
                ? "Sí"
                : "No";


    } else if (producto.categoria === "polerones") {

        campoMangaCorta.style.display =
            "none";

        campoCapucha.style.display =
            "block";

        campoTipoGorro.style.display =
            "none";

        capuchaProducto.textContent =
            producto.capucha === "si"
                ? "Sí"
                : "No";


    } else if (producto.categoria === "gorras") {

        campoMangaCorta.style.display =
            "none";

        campoCapucha.style.display =
            "none";

        campoTipoGorro.style.display =
            "block";

        tipoGorroProducto.textContent =
            producto.tipo_gorro ||
            "No especificado";
    }


    // --------------------------------------------------
    // MODAL DE ELIMINAR
    // --------------------------------------------------

    nombreProductoEliminar.textContent =
        producto.nombre;


    // --------------------------------------------------
    // CONFIRMAR ELIMINACIÓN
    // --------------------------------------------------

    confirmarEliminar.addEventListener(
        "click",
        function() {

            // Crear un nuevo array sin el producto
            const productosActualizados =
                productos.filter(function(productoActual) {

                    return productoActual.id !== id;

                });


            // Guardar los productos actualizados
            localStorage.setItem(
                "productos",
                JSON.stringify(productosActualizados)
            );


            // Volver a la lista de productos
            window.location.href =
                "admin_productos.html";

        }
    );


} else {

    // --------------------------------------------------
    // PRODUCTO NO ENCONTRADO
    // --------------------------------------------------

    nombreProducto.textContent =
        "Producto no encontrado";

    btnEditar.style.display =
        "none";

    btnEliminar.style.display =
        "none";

    imagenProducto.style.display =
        "none";
}