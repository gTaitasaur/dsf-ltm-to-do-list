const nuevaTareaInput = document.querySelector("#nuevaTarea");
const btnAgregarTarea = document.querySelector("#agregarTarea");
const listaId = document.querySelector("#tareaId");
const listaTareaDescrip = document.querySelector("#tareaDescrip");
const listaEstado = document.querySelector("#tareaStatus");
const contadorTotal = document.querySelector("#tareaTotal");
const contadorRealizadas = document.querySelector("#tareaRealizada");

let tareas = [
  { id: 1, descripcion: "Tarea 1", completada: false },
  { id: 2, descripcion: "Tarea 2", completada: false },
  { id: 3, descripcion: "Tarea 3", completada: false }
];

let contadorId = tareas.length;

/* Inicializaión de los contadores */
actualizarLista();
actualizarContadorTotal();
actualizarContadorRealizadas();

/* Acción del botón agregar tarea */
btnAgregarTarea.addEventListener("click", () => {
  const tareaNueva = nuevaTareaInput.value;
  if (tareaNueva !== "") {
    contadorId++;
    tareas.push({ id: contadorId, descripcion: tareaNueva, completada: false });
    nuevaTareaInput.value = "";
    
    actualizarLista();
    actualizarContadorTotal();
    actualizarContadorRealizadas();
  }
});

function actualizarLista() {
  let htmlId = "";
  let htmlTarea = "";
  let htmlBotones = "";
  tareas.forEach((tarea) => {
    htmlId += `<li>${tarea.id}</li>`;
    htmlTarea += `<li>${tarea.descripcion}</li>`;
    htmlBotones += `
      <li>
        <input type="checkbox" ${tarea.completada ? "checked" : ""} onchange="actualizarContador(${tarea.id})">
        <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
      </li>
    `;
  });

  listaId.innerHTML = htmlId;
  listaTareaDescrip.innerHTML = htmlTarea;
  listaEstado.innerHTML = htmlBotones;
}

/* Eliminar tarea*/
function eliminarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id);
  actualizarLista();
  actualizarContadorTotal();
  actualizarContadorRealizadas();
}

/* Funciones para actualizar el contador de tareas */
function actualizarContador(id) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
    actualizarContadorRealizadas();
  }
}

function actualizarContadorTotal() {
  contadorTotal.textContent = tareas.length;
}

function actualizarContadorRealizadas() {
  const realizadas = tareas.filter(tarea => tarea.completada).length;
  contadorRealizadas.textContent = realizadas;
}
