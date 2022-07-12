function getWeekday(a) {
  let day = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  return day[a];
}

function getMonth(a) {
  let month = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return month[a];
}

function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let actualDate = `${getWeekday(
    date.getDay()
  )}, ${date.getDate()} de ${getMonth(
    date.getMonth()
  )} de ${date.getFullYear()} ${hh}:${mm}:${ss}`;

  document.getElementById("fecha").innerHTML = actualDate;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}
currentTime();
