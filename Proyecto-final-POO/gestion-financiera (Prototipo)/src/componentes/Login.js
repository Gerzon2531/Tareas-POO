import React from 'react';

const Login = ({ onLogin }) => {
  const handleCreateAccount = () => {
    // Aquí puedes implementar la lógica para crear una nueva cuenta
    alert('Crear nueva cuenta');
  };

  return (
    <div className="login-form card" style={{ backgroundColor: '#343a40', color: '#ffffff', borderRadius: '0.25rem', padding: '1.5rem' }}>
      <div className="card-body">
        <h2 className="card-title" style={{ color: '#17a2b8' }}>Inicio de Sesión</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="admin" style={{ backgroundColor: '#454d55', borderColor: '#454d55', color: '#ffffff' }} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="123" style={{ backgroundColor: '#454d55', borderColor: '#454d55', color: '#ffffff' }} />
          </div>
          <button type="button" className="btn btn-primary mb-3" onClick={onLogin} style={{ backgroundColor: '#17a2b8', borderColor: '#17a2b8' }}>Iniciar Sesión</button>
          <div className="text-center">
            <p>¿No tienes una cuenta?</p>
            <button type="button" className="btn btn-link" onClick={handleCreateAccount} style={{ color: '#17a2b8' }}>Crear cuenta</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

