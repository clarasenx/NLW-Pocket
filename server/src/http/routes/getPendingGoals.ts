import { z } from "zod"
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/getWeekPendingGoals'

export const pendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/pendingGoals', async () => {
    const { pendingGoals } = await getWeekPendingGoals()
    return { pendingGoals }
  })

}