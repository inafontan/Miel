const productos = [
    {
      nombre: "Miel XS",
      precio: 250,
      imagen: "./imagenes/XS.jfif",
      id: 0,
    },
    {
      nombre: "Miel M",
      precio: 350,
      imagen: "./imagenes/M.jfif",
      id: 1,
    },
    {
      nombre: "Miel L",
      precio: 450,
      imagen: "./imagenes/L.jfif",
      id: 2,
    },
    {
      nombre: "Miel XL",
      precio: 650,
      imagen: "./imagenes/XL.jfif",
      id: 3,
    },
  ];

const contenedor = document.querySelector(".contenedor");
const main = document.querySelector("#mercaderia");
const sidebar = document.querySelector(".sidebar");
const btnCarrito = document.querySelector(".btn-carrito");
  
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
btnCarrito.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});  
  
const cargarProductos = () => {               // CREACIÓN DE LOS PRODUCTOS 
  productos.forEach((element) => {            
    main.innerHTML += `
            <div class="tarjeta" >
              <img class="img-mercaderia" src="${element.imagen}">     
                
              <div class="datos-mercaderia">
                 <p class="nombre">${element.nombre}</p>
                 <p class="precio"> $ <span>${element.precio}</span> </p>
               <button class="btn-agregar" data-id="${element.id}">Agregar</button>
              </div>
  
            </div>`;
});
  const btnAgregar = document.querySelectorAll(".btn-agregar");
    btnAgregar.forEach((e) =>
      e.addEventListener("click", (e) => {
        let cardPadre = e.target.parentElement;
  
        agregarAlCarrito(cardPadre);
      })
    );
  };
  
  const agregarAlCarrito = (cardPadre) => {
    let producto = {
      nombre: cardPadre.querySelector(".nombre").textContent,
      precio: Number(cardPadre.querySelector(".precio span").textContent),
      cantidad: 1,
      imagen: cardPadre.parentElement.querySelector("img").src,
      id: Number(cardPadre.querySelector("button").getAttribute("data-id")),
    };
  
    let productoEncontrado = carrito.find(
      (element) => element.id === producto.id
    );
  
    if (productoEncontrado) {
    productoEncontrado.cantidad++;
    } else {
      carrito.push(producto);
    }
    
    console.log(carrito);
    mostrarCarrito();
  };
  
  const mostrarCarrito = () => {            // MUESTRA PRODUCTOS AGREGADOS
    sidebar.innerHTML = "";
    carrito.forEach((element) => {
      let { imagen, nombre, precio, cantidad, id } = element;
      sidebar.innerHTML += `
          <div class="caja--carrito" >
            <img class="caja-carrito-img" src="${imagen}">
            
            <div class="caja--carrito--datos">
              <p class="nombre">${nombre}</p>
              <p class="cantidad">CANTIDAD: ${cantidad}</p>
              <p class="subtotal">Subtotal: $${precio * cantidad}</p>
              <p class="precio"> $ <span>${precio}</span> </p>
            <button class="btn-restar" data-id="${id}">-</button>
            <button class="btn-borrar" data-id="${id}">BORRAR</button>
            
            </div>
  
          </div>`;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));         // GUARDA PRODUCTOS AGREGADOS
    aumentarNumeroCantidadCarrito();
  };
  
  const restarProducto = (productoRestar) => {              // MODIFICAR ELEMENTOS AGREGADOS
    let productoEncontrado = carrito.find(
      (element) => element.id === Number(productoRestar)
    );
    if (productoEncontrado) {
      productoEncontrado.cantidad--;
      if (productoEncontrado.cantidad === 0) {
        productoEncontrado.cantidad = 1;
      }
    }
    mostrarCarrito();
  };
  
  const borrarProducto = (productoBorrar) => {
    carrito = carrito.filter((element) => element.id !== Number(productoBorrar));
    mostrarCarrito();
  };
  
  const escucharBotonesSidebar = () => {
    sidebar.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-restar")) {
        restarProducto(e.target.getAttribute("data-id"));
      }
      if (e.target.classList.contains("btn-borrar")) {
        borrarProducto(e.target.getAttribute("data-id"));
      }
    });
  };
  
  const aumentarNumeroCantidadCarrito = () => {
    let total = carrito.reduce((acc, ite) => acc + ite.cantidad, 0);
    document.querySelector(".cant--carrito").textContent = total;
  };
  
const calcularTotal =()=>{
  if(carrito.lenght !==0) {
  let total = carrito.reduce(
    (acc,ite) => acc + ite.precio * ite.cantidad,
    0
  );

  let divTotal = document.createElement("div");
  divTotal.className = "caja";
  divTotal.Total.id = "total--compra";

  divTotal.innerHTML = `<p> TOTAL $${total}</p><button>Finalizar compra</button>`;
  sidebar.appendChild(divTotal);
   
  let botonFinalizar = document.querySelector("#total--compra");
  botonFinalizar.onclick = () => {
    const mixin = Swal.mixin();

    mixin.fire({
      title: "Complete sus datos:",
      html: `Nro Tarjeta <input id="tarjeta" type="number" class="swal12"> <br>
             Domicilio <input id="domicilio" type="text">
             `,
      confirmButtonText:"Comprar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showCloseButton: false,
      allowOutsideClick: false,

      preConfirm: ()=>{
        let domicilio = Swal.getPopup().querySelector("#domicilio").value
        if(!domicilio){
          Swal.showValidationMessage("Por favor, complete los datos")
        }
        return domicilio;
      },
    }).then((response) =>{
      console.log(response);
      if(response.isConfirmed){
        mixin.fire(
          "Compra realizada",
          "El pedido será enviado a "+ response.value, 
          "success"
          );
        }
    });
  };
}
}

  cargarProductos();
  mostrarCarrito();
  escucharBotonesSidebar();

const producto = {nombre: "Miel XS", precio: 250, imagen: "./imagenes/XS.jfif", id: 0} 
let { nombre, precio, imagen, id} = producto

console.log (nombre)
console.log (precio)

const producto1 = {
  nombre: "Miel XS", 
  precio: 250, 
  imagen: "./imagenes/XS.jfif", 
  id: 0
}

const producto2 = {
  producto1
}

console.log (producto2)

const producto3 = {
  producto1,
  precio: 350, 
  imagen: "./imagenes/L.jfif", 
  id: 2
}

console.log (producto3)

// DECLARACION Y ASIGANCION CONDICIONAL
const compra = (producto.precio >= 250) ? true : false

// MENSAJE
compra ? console.log("Tiene descuento") : console.log("No tiene descuento")

// OPERADOR AND
const carroCompra = []

carroCompra.length === 0 && console.log("No seleccionó ningún producto aún!")

