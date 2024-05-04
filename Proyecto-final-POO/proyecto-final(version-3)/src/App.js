import React, { useState, useEffect } from 'react';
import './App.css'; 
import logo from './Logo2.JPG'; 


// Establecer conexión con la bd
import {} from "./firebase";
import {getDocs, collection, where, query, docs, Docs} from "firebase/firestore"  // Para hacer las consultas a la bd
import {db} from "./firebase";


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const [loggedInUser, setLoggedInUser] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [chartColor, setChartColor] = useState('blue');
  const [chartSize, setChartSize] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState('main'); // Nuevo estado para controlar la página a mostrar
  const [editTransactionIndex, setEditTransactionIndex] = useState(null);
  const [totalSaldo, setTotalSaldo] = useState(0);

  

  useEffect(() => {
    const ingresos = history.reduce((acc, item) => {
      return acc + (Number(item.amount) > 0 ? Number(item.amount) : 0);
    }, 0);

    const gastos = history.reduce((acc, item) => {
      return acc + (Number(item.amount) < 0 ? Number(item.amount) : 0);
    }, 0);

    setTotalIngresos(ingresos.toFixed(2));
    setTotalGastos(gastos.toFixed(2));

    const saldo = ingresos - Math.abs(gastos);
    setTotalSaldo(saldo.toFixed(2));
  }, [history]);

  useEffect(() => {
    document.body.classList.toggle('logged-in', loggedIn);
  }, [loggedIn]);




  // Aquí comienza Login

  const handleLogin = async () => {
    const dbref= collection(db,"Auth");
   

    try{
      const matchUser = query (dbref, where ("User", "==", username ));
      const matchPassword = query (dbref, where ("Password", "==", password ));
      
      const userSnapshot = await getDocs(matchUser)
      const userArray = userSnapshot.docs.map((doc) => doc.data() )

      const passwordSnapshot = await getDocs (matchPassword)
      const passwordArray = passwordSnapshot.docs.map((doc) => doc.data() )

      if (userArray.length > 0 && passwordArray.length > 0 ){
        setLoggedIn(true);
        setShowErrorMessage(false);  // Oculta el mensaje de error si las credenciales son correctas
      } else{
        setShowForm(true);
        setShowErrorMessage(true); // Muestra el mensaje de error

        setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      }

    }catch (error){
      
    }

  };


  // Aqui termina lo del login





  const handleAddTransaction = () => {
    if (!description || !selectedOption || !amount) { // Validar que todos los campos estén llenos
      setShowErrorMessage(true);
  
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 1500);
  
      return;
    }
  
    // Validar que el monto sea un número válido
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 1500);
      return;
    }
  
    // Agregar la transacción
    const newEntry = {
      description: description,
      amount: parsedAmount,
      category: selectedOption
    };
    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    setDescription('');
    setAmount('');
    setSelectedOption('');
  
    updateChart(updatedHistory);
  };
  
  

  const handleDeleteTransaction = (index) => {
    console.log(index);
    const updatedHistory = [...history];
    console.log(updatedHistory);
    updatedHistory.splice(index, 1); // Eliminar la transacción en el índice proporcionado
    setHistory(updatedHistory);


    updateChart(updatedHistory);
  };

  const handleEditTransaction = (index, updatedTransaction, cancel = false) => {
    if (!cancel) {
      const updatedHistory = [...history];
      updatedHistory[index] = updatedTransaction;
      setHistory(updatedHistory);
  
      updateChart(updatedHistory);
    }
    setEditTransactionIndex(null); // Asegurarse de restablecer el estado de edición después de editar
  };
  

  useEffect(() => {
    if (logoutClicked) {
      setLoggedIn(false);
      setLoggedInUser("");
      setHistory([]);
      setTaskList([]);
      setLogoutClicked(false);
      setCurrentPage('main');
    }
  }, [logoutClicked]);

  const handleCategoryClick = (category) => {
    setCurrentPage(category); // Cambia la página al hacer clic en un cuadro gris
  };

  const filteredHistory = history.filter((transaction) => transaction.category === currentPage);

  const updateChart = (updatedHistory) => {
    const totalAmount = updatedHistory.reduce((acc, item) => acc + Number(item.amount), 0);
    
    setChartColor(totalAmount >= 0 ? 'blue' : 'red');
    setChartSize(Math.abs(totalAmount));
  };
  
  
  return (
    <div>
      {!loggedIn && (
        <div>
          <div className="header">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="red-bar"></div>
        </div>
      )}
      {loggedIn && currentPage === 'main' && ( // Mostrar la página principal mientras currentPage sea 'main'
        <div>
          <div className="red-box">
            <p>Mis finanzas/Gastos</p>
            <button className="logout-button" onClick={() => setLogoutClicked(true)}>x</button>
          </div>
          <h1>Bienvenido {loggedInUser}</h1>
          {showErrorMessage && <p style={{ color: 'white' }}>Favor llenar todos los campos</p>}
          <div className="total-container">
            <p>Total de ingresos: {totalIngresos}</p>
            <p>Total de gastos: {totalGastos}</p>
            <p>Saldo total: {totalSaldo}</p>
          </div>
          <div className="form-container">
            <input
              type="text"
              placeholder="Ingrese descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Ingrese monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input"
            />
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="form-input"
            >
              <option value="">Seleccione una opción</option>
              <option value="Efectivo/Transferencias">Efectivo/Transferencias</option>
              <option value="Transporte">Transporte</option>
              <option value="Alimentación">Alimentación</option>
            </select>
            <button className="gray-button" onClick={handleAddTransaction}>Agregar transacción</button>
          </div>
          <div className="buttons-container text-center">
            <button className="gray-button">Gastos</button>
            <button className="gray-button">Ingresos</button>
          </div>
          <div className="circle-container">
          {chartSize > 0 && (
            <div className="circle" style={{ background: `conic-gradient(${chartColor} 0deg ${chartSize}%, transparent ${chartSize}% 360deg)` }}></div>
          )}
          </div>
          <div className="categories-container">
            <div className="category-box" onClick={() => handleCategoryClick('Efectivo/Transferencias')}>Efectivo/Transferencias</div>
            <div className="category-box" onClick={() => handleCategoryClick('Transporte')}>Transporte</div>
            <div className="category-box" onClick={() => handleCategoryClick('Alimentación')}>Alimentación</div>
          </div>
        </div>
      )}
      {loggedIn && currentPage !== 'main' && ( // Mostrar la página correspondiente al hacer clic en un cuadro gris
        <div className="gray-page">
          <div className="red-box">
            <p>Mis finanzas/Gastos</p>
            <button className="logout-button" onClick={() => setLogoutClicked(true)}>x</button>
          </div>
          <div className="gray-box">
            <div className="back-arrow" onClick={() => setCurrentPage('main')}>
              ←
            </div>
            <h3> {currentPage}</h3>
          </div>

          <div className="buttons-container">
            <button className="gray-button">Gastos</button>
            <button className="gray-button">Ingresos</button>
          </div>

          <div className="transactions-container">
            <h3>Historial de transacciones:</h3>
            <ul>
              {filteredHistory.map((transaction, index) => (
                <div key={index} className="transaction-box">
                  <div className="transaction-content">
                    <div>
                      <span>{transaction.description}</span>
                      <span>{transaction.amount}</span>
                    </div>
                    <div>
                      {editTransactionIndex === index ? (
                        <div>
                          <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <button onClick={() => handleEditTransaction(index, {...transaction, description, amount})}>Guardar</button>
                          <button onClick={() => handleEditTransaction(index, transaction, true)}>Cancelar</button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => {setEditTransactionIndex(index); setDescription(transaction.description); setAmount(transaction.amount);}}>Editar</button>
                          <button onClick={() => handleDeleteTransaction(index)}>Eliminar</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
      {!loggedIn && (
        <div className="login-container">
          <div className="login-box">
            {showErrorMessage && <p style={{ color: 'black' }}>Usuario y/o contraseña incorrectos</p>}
            <label>
              Usuario:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="button-container">
              <button type="button" onClick={handleLogin}>
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}
      {!loggedIn && (
        <div className="create-account-container">
          <button type="button" onClick={() => setShowForm(true)} className="create-account-button">
            Crear cuenta
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
