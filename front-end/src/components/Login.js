import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="full-height">
      <Header />
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem uma conta?{' '}
          <a onClick={() => navigate('/signup')}>Registre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
