type PendingGoalsResponse ={
  id: string;
  title: string;
  desireWeeklyFrequency: number;
  completionCount: number;
}[]



export async function getPendingGoals(): Promise<PendingGoalsResponse> {
  const response = await fetch('http://localhost:3333/pendingGoals')
  const data = await response.json()

  return data.pendingGoals
}