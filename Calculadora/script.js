function agregarAlDisplay(valor) {
    document.getElementById('display').value += valor;
  }
  
  function limpiarDisplay() {
    document.getElementById('display').value = '';
  }
  
  function calcular() {
    try {
      const operacion = document.getElementById('display').value;
      const resultado = eval(operacion);
      document.getElementById('display').value = resultado;
      agregarAlHistorial(operacion + ' = ' + resultado);
    } catch (error) {
      document.getElementById('display').value = 'Error';
    }
  }
  
  function almacenarOperacion() {
    const operacion = document.getElementById('display').value;
    if (operacion) {
      let operacionesAlmacenadas = localStorage.getItem('operaciones');
      if (operacionesAlmacenadas) {
        operacionesAlmacenadas = JSON.parse(operacionesAlmacenadas);
      } else {
        operacionesAlmacenadas = [];
      }
      operacionesAlmacenadas.push(operacion);
      localStorage.setItem('operaciones', JSON.stringify(operacionesAlmacenadas));
      alert('Operación almacenada en el localStorage.');
    } else {
      alert('No hay operación para almacenar.');
    }
  }
  
  function agregarAlHistorial(item) {
    const historial = document.getElementById('historial');
    const listItem = document.createElement('li');
    listItem.textContent = item;
    historial.appendChild(listItem);
  }
  