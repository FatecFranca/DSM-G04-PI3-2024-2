import React from 'react';

const SignUp = () => {
  return (
    <div className="full-height">
      <div className="form-container">
        <h2>Registrar</h2>
        <form>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
          
          <label htmlFor="confirm-password">Confirme a Senha:</label>
          <input type="password" id="confirm-password" name="confirm-password" required />
          
          <button type="submit">Registrar</button>
        </form>
        <p>Já tem uma conta? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default SignUp;
