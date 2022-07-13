import { calcArea } from "./first.js";

function buscador() {
  const productos = [
    { nombre: "combo 1 hamburguesa x2", link: "combo1" },
    { nombre: "combo 2", link: "combo2" },
    { nombre: "Lista de precios", link: "listaPrecios" },
    { nombre: "Horario de cierre", link: "reloj" },
  ];

  const formulario = document.querySelector("#buscador");
  const boton = document.querySelector("#botonBusqueda");

  const filtrar = function () {
    link = "";
    const texto = formulario.value.toLocaleLowerCase();

    for (let producto of productos) {
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

buscador();
