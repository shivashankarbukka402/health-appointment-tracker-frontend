import { CalendarHeart } from 'lucide-react'

export function Header() {
  return (
    <header className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white shadow-soft">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white/15 p-3">
          <CalendarHeart className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Health & Appointment Tracker</h1>
          <p className="mt-1 text-sm text-blue-100">
            Production-ready frontend for managing patient appointments and health visits
          </p>
        </div>
      </div>
    </header>
  )
}