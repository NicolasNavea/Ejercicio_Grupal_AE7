function buscador() {
  const productos = [
    { nombre: "combo 1", valor: "4990", link: "combo1" },
    { nombre: "combo 2", valor: 3990, link: "combo2" },
    { nombre: "Sandia", valor: 500, link: "combo3" },
    { nombre: "Melon", valor: 500, link: "combo4" },
    { nombre: "Frutillas", valor: 500, link: "combo5" },
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
