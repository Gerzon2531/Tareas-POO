import React from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="game-container">
      <Header />
      <Board />
      <Footer />
    </div>
  );
};

export default App;
