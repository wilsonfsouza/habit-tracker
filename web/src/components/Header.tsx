import { Plus } from 'phosphor-react'
import logoImage from '../assets/logo.svg'

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto items-center justify-between">
      <img src={logoImage} alt="Habits Logo" />

      <button 
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:boder-violet-300"
      >
        <Plus size={20} className="text-violet-500"/>
        New habit
      </button>
    </div>
  )
}