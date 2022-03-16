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
    if(carrito.length === 0){
      Swal.fire({
        title: "Carrito Vacío",
        icon: "warning",
      });
    }
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

const swaltToast = (texto,color,position) => {
  Swal.fire({                                     //Alerta producto agregado
    text: texto,
    background: color,
    position: position,
    icon: "success",
    toast: true,
    timer: 1500,
    showConfirmButton: false,
  });  
}
const agregarAlCarrito = (cardPadre) => {
  swaltToast("Producto agregado", "#ffff00", "top-end");
    
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
        <div class="caja--carrito">
          <img class="caja-carrito-img" src="${imagen}">
          <div class="caja--carrito--datos">
            <div class="nombre">${nombre}</div>
            <div class="cantidad">CANTIDAD: ${cantidad}</div>
            <div class="precio"> $ <span>${precio}</span> </div>
            <div class="subtotal">Subtotal: $${precio * cantidad}</div>
          <button class="btn-restar" data-id="${id}">-</button>
          <button class="btn-borrar" data-id="${id}">BORRAR</button>
          </div>
          </div>`;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));         // GUARDA PRODUCTOS AGREGADOS
  aumentarNumeroCantidadCarrito();
  calcularTotal();
  };
  
const restarProducto = (productoRestar) => {                        // MODIFICAR ELEMENTOS AGREGADOS
	swaltToast("Producto Eliminado", "#ffff00", "top-end");
    
  let productoEncontrado = carrito.find(
    (element) => element.id === Number(productoRestar)
  );
  if (productoEncontrado) {
    productoEncontrado.cantidad--;
    if (productoEncontrado.cantidad === 0) {
      borrarProducto(productoRestar);
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

const calcularTotal = () => {
  if (carrito.length !== 0) {
    let total = carrito.reduce((acc, ite) => acc + ite.precio * ite.cantidad,
      0
    );
  
    let divTotal = document.createElement("divTotal");
    divTotal.className = "caja";
    divTotal.id = "total--compra";

    divTotal.innerHTML = `<p>TOTAL $${total}</p><button>Finalizar compra</button>`;
    sidebar.appendChild(divTotal);
   
    let botonFinalizar = document.querySelector("#total--compra")
    botonFinalizar.onclick = () => {
      const mixin = Swal.mixin();

      mixin.fire({
        title: "Complete sus datos:",
        html: `<input id="tarjeta" type="number" class="swal2-input" placeholder= "Nro Tarjeta"> <br>
					 <input id="domicilio" type="text" class="swal2-input" placeholder="Domicilio">
           <p>Total : $${total}</p>
          `,
        confirmButtonText: "Comprar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showCloseButton: false,
        allowOutsideClick: false,
        preConfirm: () => {
          let domicilio = Swal.getPopup().querySelector("#domicilio").value
          if (!domicilio) {
            Swal.showValidationMessage("Por favor, complete los datos")
          }
          return domicilio;
        },
      })
        .then((response) => {
          if (response.isConfirmed) {
            console.log(response);
            mixin.fire(
              "Compra realizada",
              "El pedido será enviado a " + response.value,
              "success"
            );
          }
        });
    };
  }
};

cargarProductos();
mostrarCarrito();
escucharBotonesSidebar();