//cantidad de productos
const productos = document.querySelectorAll(".producto");

//filtro busqueda
const filtroTipo = document.getElementById("filtroTipo");
const filtroColor = document.getElementById("filtroColor");
const filtroDescuento = document.getElementById("filtroDescuento");

function filtrarProductos() {

    const tipoSeleccionado = filtroTipo.value;
    const colorSeleccionado = filtroColor.value;
    const descuentoSeleccionado = filtroDescuento.value;


    productos.forEach(function(producto) {

        const categoria = producto.dataset.categoria;
        const color = producto.dataset.color;
        const descuento = Number(producto.dataset.descuento);


        const coincideTipo =
            tipoSeleccionado === "todos" ||
            categoria === tipoSeleccionado;


        const coincideColor =
            colorSeleccionado === "todos" ||
            color === colorSeleccionado;


        const coincideDescuento =
            descuentoSeleccionado === "todos" ||
            descuento >= Number(descuentoSeleccionado);


        if (coincideTipo && coincideColor && coincideDescuento) {

            producto.parentElement.style.display = "";

        } else {

            producto.parentElement.style.display = "none";

        }

    });

}

filtroTipo.addEventListener("change", filtrarProductos);

filtroColor.addEventListener("change", filtrarProductos);

filtroDescuento.addEventListener("change", filtrarProductos);


//modal
const botonesProducto = document.querySelectorAll(".btn-ver-producto");

const modalNombre = document.getElementById("modalNombre");
const modalImagen = document.getElementById("modalImagen");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalPrecio = document.getElementById("modalPrecio");
const modalDescuento = document.getElementById("modalDescuento");

botonesProducto.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.closest(".producto");

        const nombre = producto.dataset.nombre;
        const descripcion = producto.dataset.descripcion;
        const imagen = producto.dataset.imagen;
        const precio = producto.dataset.precio;
        const descuento = producto.dataset.descuento;

        const precioNumero = Number(precio);
        const descuentoNumero = Number(descuento);

        modalNombre.textContent = nombre;
        modalDescripcion.textContent = descripcion;
        modalImagen.src = imagen;
        modalPrecio.textContent = "$" + precio;
        if (descuentoNumero == 0) {

            modalPrecio.textContent =
                "$" + precioNumero.toLocaleString("es-CL");

        } else {
        
            const precioFinal =
                precioNumero - (precioNumero * descuentoNumero / 100);
        
            modalPrecio.innerHTML =
                "-" + descuentoNumero + "% | " +
                "<s>$" + precioNumero.toLocaleString("es-CL") + "</s> | " +
                "$" + precioFinal.toLocaleString("es-CL");
        
        }

    });

});

//carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//carrito desde modal
let productoSeleccionado;

botonesProducto.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.closest(".producto");

        productoSeleccionado = producto;

    });

});

const btnAgregarCarrito = document.getElementById("btnAgregarCarrito");

btnAgregarCarrito.addEventListener("click", function() {

    const nombre = productoSeleccionado.dataset.nombre;
    const precio = productoSeleccionado.dataset.precio;
    const descuento = productoSeleccionado.dataset.descuento;
    const imagen = productoSeleccionado.dataset.imagen;

    const productoExistente = carrito.find(function(producto) {
        return producto.nombre === nombre;
    });

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        const productoCarrito = {
            nombre: nombre,
            precio: Number(precio),
            descuento: Number(descuento),
            imagen: imagen,
            cantidad: 1
        };

        carrito.push(productoCarrito);

    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

});

//carrito desde tarjeta
const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");

botonesAgregar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.closest(".producto");

        const nombre = producto.dataset.nombre;
        const precio = producto.dataset.precio;
        const descuento = producto.dataset.descuento;
        const imagen = producto.dataset.imagen;

        const productoExistente = carrito.find(function(producto) {
            return producto.nombre === nombre;
        });

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            const productoCarrito = {
                nombre: nombre,
                precio: Number(precio),
                descuento: Number(descuento),
                imagen: imagen,
                cantidad: 1
            };

            carrito.push(productoCarrito);

        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

    });

});