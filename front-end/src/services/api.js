const BASE_URL = 'http://localhost:8080'

export async function getTasks() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  if (!user || !token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${BASE_URL}/tasks/user/${user.id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Erro ao buscar tarefas');
  }
  return response.json();
}

export async function createTask(task) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ...task,
      historicoUsuarioId: task.usuarioId
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar tarefa');
  }
  return response.json();
}

export async function deleteTask(taskId) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Erro ao deletar tarefa');
  }
}

export async function getProfile(userId) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${BASE_URL}/users/${userId}/profile`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Erro ao carregar perfil');
  }
  return response.json();
}
