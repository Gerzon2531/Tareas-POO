import React, { useEffect, useRef } from 'react';
import ChartJS from 'chart.js/auto';

const Chart = ({ transactions, categories }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Calcular ingresos y gastos
    const incomes = transactions.filter(transaction => transaction.amount > 0);
    const expenses = transactions.filter(transaction => transaction.amount < 0);
    const income = incomes.reduce((total, transaction) => total + transaction.amount, 0);
    const expense = expenses.reduce((total, transaction) => total + transaction.amount, 0);

    const data = {
      labels: ['Ingresos', 'Gastos'],
      datasets: [{
        label: 'Ingresos vs Gastos',
        data: [income, Math.abs(expense)],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderWidth: 1
      }]
    };

    // Destruir el gráfico existente antes de crear uno nuevo
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Crear un nuevo gráfico
    chartInstance.current = new ChartJS(ctx, {
      type: 'doughnut',
      data: data
    });

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions]);

  const handleViewIncomeHistory = () => {
    // Implementa la lógica para navegar a la ventana de historial de ingresos
  };

  const handleViewExpenseHistory = () => {
    // Implementa la lógica para navegar a la ventana de historial de gastos
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        Resumen Financiero
      </div>
      <div className="card-body d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <canvas ref={chartRef} width="300" height="300" className="mx-auto" />
      </div>
      <div className="card-footer">
        <hr />
        <div>
          <h6>Historial General</h6>
          <ul className="list-group list-group-flush">
            {transactions.slice(-3).map((transaction, index) => (
              <li key={index} className="list-group-item">
                {transaction.description}: {transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chart;
