import { Router } from 'express'
import { prisma } from '../config/database.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, data_nascimento, senha } = req.body
    console.log('Requisição recebida:', {
      headers: req.headers,
      body: req.body
    });

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' })
    }

    if (!data_nascimento) {
      return res.status(400).json({ error: 'Data de nascimento é obrigatória.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido.' })
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado.' })
    }

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        telefone: telefone || '',
        data_nascimento: new Date(data_nascimento),
        senha,
      },
    })

    console.log('Usuário criado:', novoUsuario)
    res.status(201).json(novoUsuario)
  } catch (error) {
    console.error('Erro detalhado:', error)
    res.status(500).json({ error: `Erro ao criar o usuário: ${error.message}` })
  }
})

router.get('/', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao listar os usuários.' })
  }
})

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

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }

    // Aqui você pode implementar a geração de token JWT se desejar
    res.json({
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
});

router.get('/:id/profile', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        data_nascimento: true,
        tarefas_ativas: {
          orderBy: {
            data_criacao: 'desc'
          }
        },
        historico_tarefas: {
          orderBy: {
            data_criacao: 'desc'
          }
        }
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Combina as tarefas ativas e históricas
    const todasTarefas = [
      ...usuario.tarefas_ativas,
      ...usuario.historico_tarefas
    ];

    res.json({
      ...usuario,
      tarefas: todasTarefas,
      lastUpdate: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar perfil do usuário.' });
  }
});

export default router
