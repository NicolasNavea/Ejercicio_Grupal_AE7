// Variables
const baseDeDatos = [
  {
    id: 1,
    nombre: "Completo",
    precio: 1990,
    imagen:
      "https://www.lacocinachilena.tk/wp-content/uploads/2016/05/completo-italiano.jpg",
    link: "completo",
  },
  {
    id: 2,
    nombre: "Churrasco",
    precio: 2990,
    imagen:
      "https://tofuu.getjusto.com/orioneat-prod/Rvzo52Z32hgcw8Qw3-GRAN%20MAESTRO%20CHURRASCO%20ITALIANO.jpg",
    link: "churrasco",
  },
  {
    id: 3,
    nombre: "Papas fritas",
    precio: 1490,
    imagen:
      "https://tofuu.getjusto.com/orioneat-prod/CbrGRM6nq3nJCKBDb-Papas%20fritas%203.JPG",
    link: "papasFritas",
  },
  {
    id: 4,
    nombre: "Bebida",
    precio: 990,
    imagen:
      "https://www.tododisca.com/wp-content/uploads/2022/01/pesi-cola-1140x703.jpg",
    link: "bebida",
  },
  {
    id: 5,
    nombre: "Combo 1",
    precio: 4990,
    imagen:
      "https://img.freepik.com/foto-gratis/hamburguesa-vegetariana-papas-fritas-bebida-mesa-madera_151341-1.jpg?w=2000",
    link: "combo1",
  },
  {
    id: 6,
    nombre: "Combo 2",
    precio: 3990,
    imagen:
      "https://img.freepik.com/foto-gratis/conjunto-cerveza-hamburguesa-papas-fritas-conjunto-estandar-bebidas-comida-pub-cerveza-bocadillos-fondo-oscuro-comida-rapida-comida-tradicional-americana_124865-9913.jpg?w=2000",
    link: "combo2",
  },
];

let carrito = [];
const divisa = "$";
const DOMitems = document.querySelector("#items");
const DOMcarrito = document.querySelector("#carrito");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
  baseDeDatos.forEach((info) => {
    // Estructura
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "col-lg-2", "col-md-4", "col-sm-6");
    // Body
    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");
    // Titulo
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = info.nombre;
    // Imagen
    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-fluid");
    miNodoImagen.setAttribute("src", info.imagen);
    // Precio
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = `${info.precio}${divisa}`;
    // Boton
    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn", "btn-primary");
    miNodoBoton.textContent = "+";
    miNodoBoton.setAttribute("marcador", info.id);
    miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);
    // Insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.push(evento.target.getAttribute("marcador"));
  // Actualizamos el carrito
  renderizarCarrito();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
  // Vaciamos todo el html
  DOMcarrito.textContent = "";
  // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(carrito)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {
    // Obtenemos el item que necesitamos de la variable base de datos
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      // ¿Coincide las id? Solo puede existir un caso
      return itemBaseDatos.id === parseInt(item);
    });
    // Cuenta el número de veces que se repite el producto
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
      return itemId === item ? (total += 1) : total;
    }, 0);
    // Creamos el nodo del item del carrito
    const miNodo = document.createElement("li");
    miNodo.classList.add("list-group-item", "text-right", "mx-2");
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
    // Boton de borrar
    const miBoton = document.createElement("button");
    miBoton.classList.add("btn", "btn-danger", "mx-5");
    miBoton.textContent = "X";
    miBoton.style.marginLeft = "1rem";
    miBoton.dataset.item = item;
    miBoton.addEventListener("click", borrarItemCarrito);
    // Mezclamos nodos
    miNodo.appendChild(miBoton);
    DOMcarrito.appendChild(miNodo);
  });
  // Renderizamos el precio total en el HTML
  DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;
  // Borramos todos los productos
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });
  // volvemos a renderizar
  renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
  // Recorremos el array del carrito
  return carrito.reduce((total, item) => {
    // De cada elemento obtenemos su precio
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      return itemBaseDatos.id === parseInt(item);
    });
    // Los sumamos al total
    return total + miItem[0].precio;
  }, 0);
  // .toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
  // Limpiamos los productos guardados
  carrito = [];
  // Renderizamos los cambios
  renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener("click", vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();

function carritoPopUp() {
  var popup = document.getElementById("myPopup");
  if (popup.classList.contains("show")) {
    popup.classList.remove("show");
  } else {
    popup.classList.add("show");
  }
}

function buscador() {
  const formulario = document.querySelector("#buscador");
  const boton = document.querySelector("#botonBusqueda");

  const filtrar = function () {
    link = "";
    const texto = formulario.value.toLocaleLowerCase();

    for (let producto of baseDeDatos) {
      let nombre = producto.nombre.toLocaleLowerCase();
      if (nombre.indexOf(texto) !== -1) {
        link = producto.link;
        console.log(link);
        boton.href = `index.html#${link}`;
      }
    }
    if (link === "") {
      console.log(link);
      alert("producto no encontrado");
    }
  };

  boton.addEventListener("click", filtrar);
}
// actualizar
buscador();
