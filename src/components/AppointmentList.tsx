import { Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Appointment } from '../types/appointment'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

type Props = {
  appointments: Appointment[]
  onDelete: (id: string) => void
}

export function AppointmentList({ appointments, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'All' | Appointment['status']>('All')

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesSearch =
        a.patientName.toLowerCase().includes(search.toLowerCase()) ||
        a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
        a.department.toLowerCase().includes(search.toLowerCase())

      const matchesFilter = filter === 'All' ? true : a.status === filter

      return matchesSearch && matchesFilter
    })
  }, [appointments, search, filter])

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Appointments</h2>
          <p className="text-sm text-slate-500">Search, filter, and manage all appointments</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search appointments"
              className="pl-10"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            No appointments found.
          </div>
        ) : (
          filtered.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{appointment.patientName}</h3>
                  <p className="text-sm text-slate-600">
                    Dr. {appointment.doctorName} • {appointment.department}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {appointment.date} at {appointment.time}
                  </p>
                  {appointment.notes ? (
                    <p className="mt-2 text-sm text-slate-600">{appointment.notes}</p>
                  ) : null}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      appointment.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : appointment.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {appointment.status}
                  </span>

                  <Button
                    variant="danger"
                    onClick={() => onDelete(appointment.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}