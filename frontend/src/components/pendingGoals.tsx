import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { CreateGoalCompletion } from '../http/createGoalCompletion';
import { getPendingGoals } from '../http/getPendingGoals';
import { OutlineButton } from './ui/outline-button';

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } =useQuery({
    queryKey: ['pendingGoals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60 // 60 segundos 
  })

  if(!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await CreateGoalCompletion(goalId)

    queryClient.invalidateQueries({queryKey: ['summary']})
    queryClient.invalidateQueries({queryKey: ['pendingGoals']})
  }

  return (
    <div className='flex flex-wrap gap-3'>
      {data.map(goal => {
        return (
          <OutlineButton key={goal.id} disabled={goal.completionCount >= goal.desireWeeklyFrequency} onClick={() => {handleCompleteGoal(goal.id)}}>
            <Plus className='size-4 text-zinc-600'/>
            {goal.title}
          </OutlineButton>
        )
      })}
    </div> 
  )
}