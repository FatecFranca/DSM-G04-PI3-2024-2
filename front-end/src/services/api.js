const BASE_URL = 'http://localhost:8080'

export async function getTasks() {
  const response = await fetch(`${BASE_URL}/tasks`)
  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }
  return response.json()
}

export async function createTask(task) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
  if (!response.ok) {
    throw new Error('Failed to create task')
  }
  return response.json()
}
