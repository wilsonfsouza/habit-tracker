import { FastifyInstance } from "fastify"
import dayjs from 'dayjs'
import { z } from 'zod'
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    const {title, weekDays} = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })


  })

  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')

    const weekDay = parsedDate.get('day')

    // All habits available until a given date and day of the week
    const uncompletedHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    // Only completed habits
    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
          dailyHabits: true
      }
    })

    const completedHabits = day?.dailyHabits.map(dailyHabit => {
      return dailyHabit.habit_id
    })
    
    return {
      uncompletedHabits,
      completedHabits
    }
  })

  app.patch('/habits/:id/toggle', async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid()
    })

    const { id } = toggleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate() 

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    // Find if user already has the habit completed in that day
    const dailyHabit = await prisma.dailyHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if (dailyHabit) {
      // Remove checking habit as completed
      await prisma.dailyHabit.delete({
        where: {
          id: dailyHabit.id
        }
      })
    } else {
      // Complete a habit in that day
      await prisma.dailyHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  })
}

