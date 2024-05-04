import React, { useState } from 'react';

const TransactionForm = ({ categories, onAddTransaction }) => {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState(''); // Cambiar el estado inicial a una cadena vacía

  const handleSubmit = e => {
    e.preventDefault();
    if (!descripcion || !monto) return;
    onAddTransaction(descripcion, parseFloat(monto), categoria);
    setDescripcion('');
    setMonto('');
    setCategoria(''); // Establecer la categoría en blanco después de manejar el envío del formulario
  };

  return (
    <div className="transaction-form card p-4 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
      <h2 className="card-header">Agregar Transacción</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción:</label>
            <input
              id="descripcion"
              type="text"
              className="form-control"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="monto" className="form-label">Monto:</label>
            <input
              id="monto"
              type="number"
              className="form-control"
              value={monto}
              onChange={e => setMonto(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoría:</label>
            <select
              id="categoria"
              className="form-select"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value="">Selecciona una categoría...</option> {/* Opción en blanco */}
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default TransactionForm;
