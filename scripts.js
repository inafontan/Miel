let productoSeleccionado;

class Producto {
    constructor (id, nombre, peso, precio) {
        this.id = id;
        this.nombre = nombre;
        this.peso = peso;
        this.precio = precio;
    }
}

const mielXS = new Producto(1, "MielXS", "250gr", 300);
const mielM = new Producto(2, "MielM", "500gr", 500);
const mielL = new Producto(3, "MielL", "750gr", 700);
const mielXG = new Producto(4, "MielXG", "1000gr", 900);

const productos = [mielXS, mielM, mielL, mielXG];

const carrito = [ ]  // Se guardan los productos

const carritoDiv = document.getElementById ("carritoDiv");

const saludar = () => {                 
    alert("Bienvenido a nuestro Shop");         // Saludar y mostrar nombre
    let nombre = prompt("Ingrese su nombre");
    carritoDiv.innerHTML = `<h2>Bienvenido/a ${nombre.toUpperCase()}</h2>`;
};

const consultarProducto = () => {
        let texto = "";
    for (let p of productos) {                       //Recorro los productos
        texto += `${p.id}) ${p.nombre}\n`;
    }

    let producto = parseInt(prompt(`Qué producto llevará?\n ${texto}`));             //Se muestra el resultado del recorrido anterior
    while (isNaN(producto) || producto <1 || producto > 4) {
        producto = parseInt(prompt(`Qué producto llevará?\n ${texto}`));
    }

    return producto; 

};    

const llevarProducto = ()=>{
    let buscarProducto = productos.find(                    // Busca dentro del inventario productos
        (element) => element.id === productoSeleccionado
    ); 

    let existe = carrito.some((element) => element.id === buscarProducto.id);
    console.log(existe);

    if(existe){
        carrito.map(element=>{
            if(element.id === buscarProducto.id){
                element.cantidad++;
                return element;
            }
        });
    }else{
        buscarProducto.cantidad = 1;                           // Cantidad del producto a llevar
        carrito.push(buscarProducto);                          // Guardar en el carrito el producto selecionado 
    }

    let seguir = confirm("Desea llevar otro producto?")    // Agregar varios productos al carrito.
    if (seguir){                                           //  Se agrega más de uno que ya está (true)
        productoSeleccionado = consultarProducto ();
        llevarProducto ();
    }
}; 

const mostrarProductos = ()=>{
    let contenidoCarrito=document.createElement("div");
    contenidoCarrito.className = "carrito";
    carritoDiv.appendChild(contenidoCarrito);

    carrito.forEach((element) => {
        contenidoCarrito.innerHTML += `<div class="carritoDiv">
        <h3>NOMBRE ${element.nombre}</h3>
        <h3>PRECIO ${element.precio}</h3>
        <h3>CANTIDAD ${element.cantidad}</h3>
        <h3>Subtotal ${element.precio * element.cantidad}</h3>
        </div>`;
    });
};

const calcularTotal = () => {
    let total = carrito.reduce((acc, ite) => acc + ite.cantidad * ite.precio, 0);
    document.body.innerHTML+= `<div class="totalCarrito"><h3>TOTAL ${total}</h3></div>`;
};
    
saludar();
productoSeleccionado = consultarProducto();
llevarProducto();
mostrarProductos();
calcularTotal();