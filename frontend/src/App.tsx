import { CreateGoal } from './components/createGoal'
import { EmptyGoals } from './components/emptyGoals'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'


export function App() {

  return (
    <Dialog >
      {/* <EmptyGoals /> */}

      <Summary />
      
      <CreateGoal />
    </Dialog>
  )
}


