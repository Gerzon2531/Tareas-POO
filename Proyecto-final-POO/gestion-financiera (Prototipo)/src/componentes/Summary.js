import React from 'react';

const Summary = ({ transactions }) => {
  const income = transactions.reduce((total, transaction) => {
    return transaction.amount > 0 ? total + transaction.amount : total;
  }, 0);

  const expense = transactions.reduce((total, transaction) => {
    return transaction.amount < 0 ? total + Math.abs(transaction.amount) : total;
  }, 0);

  const balance = income - expense;

  return (
    <div className="row">
      <div className="col-sm-4">
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h5 className="card-title">Ingresos</h5>
            <p className="card-text">${income}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card text-white bg-danger mb-3">
          <div className="card-body">
            <h5 className="card-title">Gastos</h5>
            <p className="card-text">-${expense}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card text-white bg-primary mb-3">
          <div className="card-body">
            <h5 className="card-title">Saldo Actual</h5>
            <p className="card-text">${balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
