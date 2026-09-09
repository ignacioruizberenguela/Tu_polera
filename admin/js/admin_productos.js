// Obtener productos guardados

let productos =
JSON.parse(localStorage.getItem("productos"));

// Si todavía no existen productos,
// crear los productos iniciales

if (!productos) {

productos = [

    {
        id: 1,
        nombre: "Polera personalizada",
        categoria: "poleras",
        precio: 12990,
        color: "negro",
        descuento: 50,
        tallas: ["S", "M", "L", "XL"],
        manga_corta: "si",
        descripcion: "Diseña tu propia polera personalizada.",
        imagen: "../Imagenes/imagen1.png"
    },

    {
        id: 2,
        nombre: "Polerón personalizado",
        categoria: "polerones",
        precio: 24990,
        color: "negro",
        descuento: 5,
        tallas: ["S", "M", "L", "XL"],
        capucha: "si",
        descripcion: "Diseña tu propio polerón personalizado.",
        imagen: "../Imagenes/imagen2.png"
    },

    {
        id: 3,
        nombre: "Gorra personalizada",
        categoria: "gorras",
        precio: 8990,
        color: "negro",
        descuento: 50,
        tallas: ["Única"],
        tipo_gorro: "Snapback",
        descripcion: "Diseña tu propia gorra personalizada.",
        imagen: "../Imagenes/imagen3.png"
    },

    {
        id: 4,
        nombre: "Gorra personalizada",
        categoria: "gorras",
        precio: 8990,
        color: "negro",
        descuento: 15,
        tallas: ["Única"],
        tipo_gorro: "Snapback",
        descripcion: "Diseña tu propia gorra personalizada.",
        imagen: "../Imagenes/imagen3.png"
    },

    {
        id: 5,
        nombre: "Polerón personalizado",
        categoria: "polerones",
        precio: 24990,
        color: "negro",
        descuento: 25,
        tallas: ["S", "M", "L", "XL"],
        capucha: "si",
        descripcion: "Diseña tu propio polerón personalizado.",
        imagen: "../Imagenes/imagen2.png"
    },

    {
        id: 6,
        nombre: "Polera personalizada",
        categoria: "poleras",
        precio: 12990,
        color: "negro",
        descuento: 50,
        tallas: ["S", "M", "L", "XL"],
        manga_corta: "si",
        descripcion: "Diseña tu propia polera personalizada.",
        imagen: "../Imagenes/imagen1.png"
    }



];

localStorage.setItem(
    "productos",
    JSON.stringify(productos)
);


}

// Obtener la tabla

const tablaProductos =
document.getElementById("tablaProductos");

// Mostrar productos

productos.forEach(function(producto) {

tablaProductos.innerHTML += `

    <tr>

        <td>
            ${producto.id}
        </td>

        <td>
            ${producto.nombre}
        </td>

        <td>
            $${producto.precio.toLocaleString("es-CL")}
        </td>

        <td>
            ${producto.descuento}%
        </td>

        <td>

            <a
                href="ver_producto.html?id=${producto.id}"
                class="btn btn-dark btn-sm">

                Datos

            </a>

        </td>

        <td>

            <a
                href="editar_producto.html?id=${producto.id}"
                class="btn btn-primary btn-sm">

                Editar

            </a>

        </td>

    </tr>`;

});
