import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js' // Adicionando o CRUD de tarefas
import { testConnection } from './config/database.js'

const app = express()

// Middlewares
app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000', // URL do seu front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// Teste de conexão ao iniciar o servidor
testConnection()

// Rotas
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter) // Conectar o CRUD de tarefas

export default app
