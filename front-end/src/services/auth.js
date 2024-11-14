const API_URL = 'http://localhost:8080';

export const authService = {
  async login(email, senha) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });
    
    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha no registro');
      }

      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw new Error(error.message || 'Erro ao conectar com o servidor');
    }
  }
}; 