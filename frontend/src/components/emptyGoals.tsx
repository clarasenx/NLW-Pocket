import { Plus } from 'lucide-react'

import letsStart from "../assets/letsStart.svg"
import logo from "../assets/logoInOrbit.svg"
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'

export function EmptyGoals() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-8'>
        <img src={logo} alt="logo in.orbit" />
        <img src={letsStart} alt="logo in.orbit" />

        <p className='text-zinc-300  leading-relaxed max-w-80 text-center'>
          Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo?
        </p>

        <DialogTrigger asChild>
          <Button>
          <Plus className='size-4'/>
          Cadastrar Meta</Button>
        </DialogTrigger>
      </div>
  )
}