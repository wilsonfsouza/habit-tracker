import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './lib/prisma'

const app = Fastify()

app.register(cors, {
  origin: ['http://localhost:3000']
})

app.get('/', async () => {
  const habits = await prisma.habit.findMany()

  return habits
})

app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP Server running!')
})