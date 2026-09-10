// Obtener productos guardados

let productos =
JSON.parse(localStorage.getItem("productos"));

// Si todavía no existen productos,
// crear los productos iniciales

if (!productos) {

productos = [

    {
        id: 1,
        nombre: "Urban Red",
        categoria: "poleras",
        precio: 12990,
        color: "rojo",
        descuento: 50,
        tallas: ["S", "M", "L", "XL"],
        manga_corta: "si",
        descripcion: "Polera liviana y cómoda, ideal para un estilo casual y urbano.",
        imagen: "../Imagenes/imagen1.png"
    },

    {
        id: 2,
        nombre: "Black Street",
        categoria: "poleras",
        precio: 14990,
        color: "negro",
        descuento: 10,
        tallas: ["S", "M", "L", "XL"],
        manga_corta: "no",
        descripcion: "Diseño de manga larga pensado para complementar outfits modernos.",
        imagen: "../Imagenes/imagen2.png"
    },

    {
        id: 3,
        nombre: "Black Hoodie",
        categoria: "polerones",
        precio: 24990,
        color: "negro",
        descuento: 25,
        tallas: ["S", "M", "L", "XL"],
        capucha: "si",
        descripcion: "Prenda abrigadora y versátil para disfrutar los días más fríos.",
        imagen: "../Imagenes/imagen3.png"
    },

    {
        id: 4,
        nombre: "Red Classic",
        categoria: "polerones",
        precio: 22990,
        color: "rojo",
        descuento: 15,
        tallas: ["S", "M", "L", "XL"],
        capucha: "no",
        descripcion: "Estilo sencillo y cómodo que combina fácilmente con distintos looks.",
        imagen: "../Imagenes/imagen4.png"
    },

    {
        id: 5,
        nombre: "Yellow Trucker",
        categoria: "gorras",
        precio: 8990,
        color: "amarillo",
        descuento: 20,
        tallas: ["Única"],
        tipo_gorro: "Trucker",
        descripcion: "Gorra fresca y llamativa, perfecta para complementar un look casual.",
        imagen: "../Imagenes/imagen5.png"
    },

    {
        id: 6,
        nombre: "Black Jockey",
        categoria: "gorras",
        precio: 8990,
        color: "negro",
        descuento: 10,
        tallas: ["Única"],
        tipo_gorro: "Jockey",
        descripcion: "Diseño clásico y versátil para usar en cualquier ocasión.",
        imagen: "../Imagenes/imagen6.png"
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
