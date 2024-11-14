import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import Header from './Header';

const SignUp = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    data_nascimento: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const userData = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone || '',
        data_nascimento: formData.data_nascimento
      };

      console.log('Tentando enviar dados:', userData);
      const response = await authService.register(userData);
      console.log('Resposta do servidor:', response);
      navigate('/login');
    } catch (error) {
      console.error('Detalhes do erro:', {
        message: error.message,
        stack: error.stack
      });
      setError(error.message);
    }
  };

  return (
    <div className="full-height">
      <Header />
      <div className="form-container">
        <h2>Registrar</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <label>Telefone:</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
          
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            required
          />
          
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          
          <label>Confirme a Senha:</label>
          <input
            type="password"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />
          
          <button type="submit">Registrar</button>
        </form>
        <p>Já tem uma conta? <a onClick={() => navigate('/login')}>Login</a></p>
      </div>
    </div>
  );
};

export default SignUp;
