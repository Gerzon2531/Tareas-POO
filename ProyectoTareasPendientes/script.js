// Función para agregar una tarea
function agregarTarea() {
  var entradaTarea = document.getElementById("entradaTarea");
  var tarea = entradaTarea.value.trim();
  if (tarea !== "") {
    var tareasPendientes = JSON.parse(localStorage.getItem("tareasPendientes")) || [];
    tareasPendientes.push(tarea);
    localStorage.setItem("tareasPendientes", JSON.stringify(tareasPendientes));
    mostrarTareasPendientes();
    entradaTarea.value = "";
  }
}

// Función para mostrar las tareas pendientes
function mostrarTareasPendientes() {
  var tareasPendientes = JSON.parse(localStorage.getItem("tareasPendientes")) || [];
  var listaTareasPendientes = document.getElementById("tareasPendientes");
  listaTareasPendientes.innerHTML = "";
  tareasPendientes.forEach(function(tarea) {
    var li = document.createElement("li");
    li.textContent = tarea;
    var botonCompletada = document.createElement("button");
    botonCompletada.textContent = "Completada";
    botonCompletada.onclick = function() { moverTareaACompletadas(tarea); };
    li.appendChild(botonCompletada);
    listaTareasPendientes.appendChild(li);
  });
}

// Función para mover una tarea pendiente a tareas realizadas
function moverTareaACompletadas(tarea) {
  var tareasPendientes = JSON.parse(localStorage.getItem("tareasPendientes")) || [];
  var tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];
  var index = tareasPendientes.indexOf(tarea);
  if (index !== -1) {
    tareasPendientes.splice(index, 1);
    tareasCompletadas.push(tarea);
    localStorage.setItem("tareasPendientes", JSON.stringify(tareasPendientes));
    localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
    mostrarTareasPendientes();
    mostrarTareasCompletadas();
  }
}

// Función para mostrar las tareas realizadas
function mostrarTareasCompletadas() {
  var tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];
  var listaTareasCompletadas = document.getElementById("tareasCompletadas");
  listaTareasCompletadas.innerHTML = "";
  tareasCompletadas.forEach(function(tarea) {
    var li = document.createElement("li");
    li.textContent = tarea;
    var botonPapelera = document.createElement("button");
    botonPapelera.textContent = "Papelera";
    botonPapelera.onclick = function() { moverTareaAPapelera(tarea); };
    li.appendChild(botonPapelera);
    listaTareasCompletadas.appendChild(li);
  });
}

// Función para mover una tarea realizada a la papelera
function moverTareaAPapelera(tarea) {
  var tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];
  var papelera = JSON.parse(localStorage.getItem("papelera")) || [];
  var index = tareasCompletadas.indexOf(tarea);
  if (index !== -1) {
    tareasCompletadas.splice(index, 1);
    papelera.push(tarea);
    localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
    localStorage.setItem("papelera", JSON.stringify(papelera));
    mostrarTareasCompletadas();
    mostrarPapelera();
  }
}

// Función para mostrar las tareas en la papelera
function mostrarPapelera() {
  var papelera = JSON.parse(localStorage.getItem("papelera")) || [];
  var listaPapelera = document.getElementById("papelera");
  listaPapelera.innerHTML = "";
  papelera.forEach(function(tarea) {
    var li = document.createElement("li");
    li.textContent = tarea;
    listaPapelera.appendChild(li);
  });
}

// Función para vaciar la papelera
function vaciarPapelera() {
  localStorage.removeItem("papelera");
  mostrarPapelera();
}

// Mostrar las tareas pendientes al cargar la página
mostrarTareasPendientes();

// Mostrar las tareas realizadas al cargar la página
mostrarTareasCompletadas();

// Mostrar las tareas en la papelera al cargar la página
mostrarPapelera();