// PRODUCTOS
//CATALOGO DE PRODUCTOS
const productos = [
    // Camisetas y Baggys
    {
        id: "Camiseta",
        titulo: "Oversize estampada",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS282zY03NXPJh8DEz7raGHBcvDeBIxYv30lkHVou4qnw&s=10",
        categoria: {
            nombre: "Camiseta",
            id: "Camiseta"
        },
        precio: 45000
    },
    {
        id: "Camiseta sencilla",
        titulo: "Camiseta sin estampado",
        imagen: "https://www.homen.com.co/cdn/shop/files/AZUL_PETROLEO_c28a5482-c3f3-4726-a2c7-3276502ab22d.jpg?v=1762614915&width=1920",
        categoria: {
            nombre: "Camiseta sencilla",
            id: "Camiseta sencilla"
        },
        precio: 25000
    },
    {
        id: "Baggys",
        titulo: "Baggys jeans",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_869381-MCO92325378289_092025-O.webp",
        categoria: {
            nombre: "Baggys",
            id: "Baggys"
        },
        precio:  140000
    },
    {
        id: "Camisetas Subterra",
        titulo: "Subterra",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSheEf2LmUO6ebHeZI9CIn5sPE2eS_B6E2Ebso_ltEpVZFDeL0BWl39yOk&s=10",
        categoria: {
            nombre: "Camiseta Subterra",
            id: "Subterra"
        },
        precio: 55000
    },
    
    // Zapatos
    {
        id: "Zapatos DC",
        titulo: "DC",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4c3-6V2NNUxZ_0LsjuYcbEkMe6yN2R2tYNlp9rWTDr5YlYNR3FrFZqe8&s=10",
        categoria: {
            nombre: "Zapatos DC",
            id: "DC"
        },
        precio: 130000
    },
    {
        id: "DC Blancos ",
        titulo: "Blancos DC",
        imagen: "https://feidclothes.com/cdn/shop/files/62D10751-271C-4F13-8659-ED77E74A5B93.jpg?v=1738462243",
        categoria: {
            nombre: "Blancos DC ",
            id: "DC white"
        },
        precio: 135000
    },
    {
        id: "DC Negros",
        titulo: "Negros DC",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu94YToYFnsxUVbOVn28JgG0I2aAf2YsnSPmEZpGjm3AGC2F2CapGGY3s&s=10",
        categoria: {
            nombre: "Negros Dc",
            id: "DC BLACK"
        },
        precio: 140000
    },
    

    
];
//código Js
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {


    contenedorProductos.innerHTML = "";


    productosElegidos.forEach(producto => {


        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;


        contenedorProductos.append(div);
    })


    actualizarBotonesAgregar();
}


cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {


        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");


        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }


    })
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");


    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


let productosEnCarrito;


let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);


    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }


    actualizarNumerito();


    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}