// Obtener el ID desde la URL
const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));

// Obtener productos desde localStorage
const productos =
    JSON.parse(localStorage.getItem("productos")) || [];

// Buscar producto
const producto = productos.find(function(producto) {
    return producto.id === id;
});


// --------------------------------------------------
// ELEMENTOS DEL FORMULARIO
// --------------------------------------------------

const formulario = document.getElementById("formProducto");

const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const precio = document.getElementById("precio");
const color = document.getElementById("color");
const descuento = document.getElementById("descuento");
const imagen = document.getElementById("imagen");
const descripcion = document.getElementById("descripcion");


// Tallas
const tallasCheckbox = document.querySelectorAll(
    'input[name="tallas"]'
);


// Campos especiales
const campoMangaCorta =
    document.getElementById("campoMangaCorta");

const campoCapucha =
    document.getElementById("campoCapucha");

const campoTipoGorro =
    document.getElementById("campoTipoGorro");

const mangaCorta =
    document.getElementById("mangaCorta");

const capucha =
    document.getElementById("capucha");

const tipoGorro =
    document.getElementById("tipoGorro");


// --------------------------------------------------
// MOSTRAR / OCULTAR CAMPOS SEGÚN CATEGORÍA
// --------------------------------------------------

function actualizarCampos() {

    if (categoria.value === "poleras") {

        campoMangaCorta.style.display = "block";
        campoCapucha.style.display = "none";
        campoTipoGorro.style.display = "none";

    } else if (categoria.value === "polerones") {

        campoMangaCorta.style.display = "none";
        campoCapucha.style.display = "block";
        campoTipoGorro.style.display = "none";

    } else if (categoria.value === "gorras") {

        campoMangaCorta.style.display = "none";
        campoCapucha.style.display = "none";
        campoTipoGorro.style.display = "block";

    } else {

        campoMangaCorta.style.display = "none";
        campoCapucha.style.display = "none";
        campoTipoGorro.style.display = "none";
    }
}


// Actualizar campos cuando cambia la categoría
categoria.addEventListener("change", actualizarCampos);


// --------------------------------------------------
// CARGAR PRODUCTO EXISTENTE
// --------------------------------------------------

if (producto) {

    nombre.value = producto.nombre;

    categoria.value = producto.categoria;

    precio.value = producto.precio;

    color.value = producto.color;

    descuento.value = producto.descuento;

    descripcion.value = producto.descripcion;


    // --------------------------------------------------
    // CARGAR IMAGEN
    // --------------------------------------------------

    if (producto.imagen) {

        let rutaImagen = producto.imagen;

        // Si el producto antiguo tiene ../, lo quitamos
        // porque ahora guardaremos las rutas sin ../
        if (rutaImagen.startsWith("../")) {
            rutaImagen = rutaImagen.substring(3);
        }

        imagen.value = rutaImagen;
    }


    // --------------------------------------------------
    // CARGAR TALLAS
    // --------------------------------------------------

    if (producto.tallas) {

        tallasCheckbox.forEach(function(checkbox) {

            if (producto.tallas.includes(checkbox.value)) {
                checkbox.checked = true;
            }

        });
    }


    // --------------------------------------------------
    // CARGAR CAMPOS ESPECÍFICOS
    // --------------------------------------------------

    if (producto.categoria === "poleras") {

        if (producto.manga_corta) {
            mangaCorta.value = producto.manga_corta;
        }

    } else if (producto.categoria === "polerones") {

        if (producto.capucha) {
            capucha.value = producto.capucha;
        }

    } else if (producto.categoria === "gorras") {

        if (producto.tipo_gorro) {
            tipoGorro.value = producto.tipo_gorro;
        }
    }


    actualizarCampos();

} else {

    // Si no existe ID, significa que estamos creando
    // un producto nuevo.

    actualizarCampos();
}


// --------------------------------------------------
// GUARDAR PRODUCTO
// --------------------------------------------------

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    // --------------------------------------------------
    // OBTENER TALLAS SELECCIONADAS
    // --------------------------------------------------

    const tallasSeleccionadas = [];

    tallasCheckbox.forEach(function(checkbox) {

        if (checkbox.checked) {
            tallasSeleccionadas.push(checkbox.value);
        }

    });


    // --------------------------------------------------
    // EDITAR PRODUCTO EXISTENTE
    // --------------------------------------------------

    if (producto) {

        producto.nombre = nombre.value;

        producto.categoria = categoria.value;

        producto.precio = Number(precio.value);

        producto.color = color.value;

        producto.descuento = Number(descuento.value);

        producto.tallas = tallasSeleccionadas;

        // Guardar ruta SIN ../
        producto.imagen = imagen.value;

        producto.descripcion = descripcion.value;


        // --------------------------------------------------
        // CAMPOS ESPECÍFICOS
        // --------------------------------------------------

        if (producto.categoria === "poleras") {

            producto.manga_corta = mangaCorta.value;

            delete producto.capucha;
            delete producto.tipo_gorro;

        } else if (producto.categoria === "polerones") {

            producto.capucha = capucha.value;

            delete producto.manga_corta;
            delete producto.tipo_gorro;

        } else if (producto.categoria === "gorras") {

            producto.tipo_gorro = tipoGorro.value;

            delete producto.manga_corta;
            delete producto.capucha;
        }


        // Guardar cambios
        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );


        // Volver a la lista
        window.location.href = "admin_productos.html";


    } else {

        // --------------------------------------------------
        // CREAR PRODUCTO NUEVO
        // --------------------------------------------------

        let nuevoId = 1;

        if (productos.length > 0) {

            nuevoId =
                Math.max(
                    ...productos.map(function(producto) {
                        return producto.id;
                    })
                ) + 1;
        }


        // --------------------------------------------------
        // CREAR OBJETO
        // --------------------------------------------------

        const nuevoProducto = {

            id: nuevoId,

            nombre: nombre.value,

            categoria: categoria.value,

            precio: Number(precio.value),

            color: color.value,

            descuento: Number(descuento.value),

            tallas: tallasSeleccionadas,

            // Guardamos SIN ../
            imagen: imagen.value,

            descripcion: descripcion.value
        };


        // --------------------------------------------------
        // AGREGAR CAMPO ESPECÍFICO
        // --------------------------------------------------

        if (nuevoProducto.categoria === "poleras") {

            nuevoProducto.manga_corta = mangaCorta.value;

        } else if (nuevoProducto.categoria === "polerones") {

            nuevoProducto.capucha = capucha.value;

        } else if (nuevoProducto.categoria === "gorras") {

            nuevoProducto.tipo_gorro = tipoGorro.value;
        }


        // Agregar producto
        productos.push(nuevoProducto);


        // Guardar en localStorage
        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );


        // Volver a productos
        window.location.href = "admin_productos.html";
    }

});