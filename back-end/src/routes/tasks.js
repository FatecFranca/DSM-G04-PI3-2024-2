import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, prazo, usuarioId } = req.body

    if (!titulo || !usuarioId) {
      return res.status(400).json({ error: 'Título e usuário são obrigatórios.' })
    }

    const novaTarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        data_criacao: new Date(),
        prazo: prazo ? new Date(prazo) : null,
        status: 'ativa',
        usuario: { connect: { id: usuarioId } },
      },
    })

    res.status(201).json(novaTarefa)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar a tarefa.' })
  }
})

router.get('/', async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      include: { usuario: true }, // Inclui informações do usuário
    })
    res.json(tarefas)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao listar as tarefas.' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, descricao, prazo, status } = req.body

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: {
        titulo,
        descricao,
        prazo: prazo ? new Date(prazo) : null,
        status,
      },
    })

    res.json(tarefaAtualizada)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizar a tarefa.' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.tarefa.delete({
      where: { id },
    })

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao deletar a tarefa.' })
  }
})

export default router
