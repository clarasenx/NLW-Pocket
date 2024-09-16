interface CreateGoalRequest {
  title: string,
  desireWeeklyFrequency: number
}

export async function createGoal({
  title,
  desireWeeklyFrequency,
}: CreateGoalRequest): Promise<void> {
  const response = await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desireWeeklyFrequency,
    }),
  })

  if (!response.ok) {
    throw new Error('Error while creating the goal')
  }
}