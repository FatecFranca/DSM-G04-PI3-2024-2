import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, data_nascimento, senha } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' })
    }

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        telefone,
        data_nascimento: new Date(data_nascimento),
        senha,
      },
    })

    res.status(201).json(novoUsuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar o usuário.' })
  }
})

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao listar os usuários.' })
  }
})

// Atualizar um usuário
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email, telefone, data_nascimento, senha } = req.body

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome,
        email,
        telefone,
        data_nascimento: data_nascimento ? new Date(data_nascimento) : undefined,
        senha,
      },
    })

    res.json(usuarioAtualizado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizar o usuário.' })
  }
})

// Deletar um usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.usuario.delete({
      where: { id },
    })

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao deletar o usuário.' })
  }
})

export default router
