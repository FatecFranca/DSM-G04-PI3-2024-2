const BASE_URL = 'http://localhost:8080'

export async function getTasks() {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Erro ao buscar tarefas')
  }
  return response.json()
}

export async function createTask(task) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...task,
      historicoUsuarioId: task.usuarioId
    })
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao criar tarefa')
  }
  return response.json()
}

export async function deleteTask(taskId) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Erro ao deletar tarefa');
  }
}
