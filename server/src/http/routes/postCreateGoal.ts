import { z } from "zod"
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../functions/createGoal'

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.post('/goals', {
    schema: {
      body: z.object({
        title: z.string(),
        desireWeeklyFrequency: z.number().int().min(1).max(7),
      })
    },
  },
    async (request) => {
      const { title, desireWeeklyFrequency } = request.body
      await createGoal({
        title,
        desireWeeklyFrequency
      })
    })
}