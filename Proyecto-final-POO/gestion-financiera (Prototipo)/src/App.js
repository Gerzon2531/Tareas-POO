import React, { useState } from 'react';
import Login from './components/Login';
import Chart from './components/Chart';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import './App.css'; // Importar el archivo de estilos personalizados

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categories] = useState(['Alimentos', 'Transporte', 'Transferencias', 'Otros']);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTransactions([]);
  };

  const addTransaction = (description, amount, category) => {
    const newTransaction = { description, amount, category };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  };

  const deleteTransaction = index => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  };

  return (
    <div className={`container mt-3 ${isLoggedIn ? 'dark-mode' : ''}`}>
      <h1 className="text-center mb-4">Gestión Financiera</h1>
      {isLoggedIn ? (
        <div>
          <button className="btn btn-danger mb-3" onClick={handleLogout}>Salir X</button>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Summary transactions={transactions} />
            </div>
            <div className="col-md-6 mb-3">
              <TransactionForm categories={categories} onAddTransaction={addTransaction} />
            </div>
          </div>
          <div className="mt-2">
            <h2>Historial de Transacciones</h2>
            <ul className="list-group">
              {transactions.map((transaction, index) => (
                <li key={index} className="list-group-item">
                  <div>{transaction.description}</div>
                  <div>{transaction.amount}</div>
                  <div>{transaction.category}</div>
                  <button className="btn btn-danger btn-sm float-end" onClick={() => deleteTransaction(index)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <Chart transactions={transactions} />
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
