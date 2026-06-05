import { Activity, CalendarCheck, CalendarX2, Clock3 } from 'lucide-react'
import { Card } from './ui/Card'
import { Appointment } from '../types/appointment'

type Props = {
  appointments: Appointment[]
}

export function StatsCards({ appointments }: Props) {
  const total = appointments.length
  const scheduled = appointments.filter((a) => a.status === 'Scheduled').length
  const completed = appointments.filter((a) => a.status === 'Completed').length
  const cancelled = appointments.filter((a) => a.status === 'Cancelled').length

  const items = [
    { label: 'Total Appointments', value: total, icon: Activity },
    { label: 'Scheduled', value: scheduled, icon: Clock3 },
    { label: 'Completed', value: completed, icon: CalendarCheck },
    { label: 'Cancelled', value: cancelled, icon: CalendarX2 }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">{item.value}</h3>
              </div>
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}