import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { createGoalRoute } from './routes/postCreateGoal';
import { goalCompletionRoute } from './routes/postGoalCompletion';
import { pendingGoalsRoute } from './routes/getPendingGoals';
import { getWeekSummaryRoute } from './routes/getWeekSummaryRoute';
import fastifyCors from '@fastify/cors';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin:'*'
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)

app.register(goalCompletionRoute)

app.register(pendingGoalsRoute)

app.register(getWeekSummaryRoute)


app.listen({
  port:3333,
}).then(() => {
  console.log('---- HTTP server running! ----')
})