import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js' // Adicionando o CRUD de tarefas

const app = express()

// Middlewares
app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

// Rotas
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter) // Conectar o CRUD de tarefas

export default app
