document.addEventListener("DOMContentLoaded", function () {

    const usuariosGuardados = localStorage.getItem("usuarios");

    if (!usuariosGuardados) {

        const usuarios = [
            {
                id: 1,
                nombre: "Juan",
                correo: "juan@gmail.com",
                rut: "3632297-7",
                region: "Metropolitana de Santiago",
                comuna: "Santiago",
                password: "123456",
                rol: "cliente"
            },

            {
                id: 2,
                nombre: "Pedro",
                correo: "pedro@gmail.com",
                rut: "34798536-8",
                region: "Biobío",
                comuna: "Concepción",
                password: "123456",
                rol: "vendedor"
            },

            {
                id: 3,
                nombre: "Admin",
                correo: "adminn@gmail.com",
                rut: "7967980-1",
                region: "Biobío",
                comuna: "Concepción",
                password: "123456",
                rol: "administrador"
            }
        ];

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );
    }


    const productosGuardados = localStorage.getItem("productos");

    if (!productosGuardados) {

        const productos = [
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

});
