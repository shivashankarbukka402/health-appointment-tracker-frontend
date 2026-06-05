import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { StatsCards } from './components/StatsCards'
import { AppointmentForm } from './components/AppointmentForm'
import { AppointmentList } from './components/AppointmentList'
import { Appointment } from './types/appointment'
import { mockAppointments } from './data/mockAppointments'
import { appointmentApi } from './lib/api'

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [useMockData, setUseMockData] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await appointmentApi.getAll()
        setAppointments(data)
      } catch {
        setUseMockData(true)
        setAppointments(mockAppointments)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleAdd = async (newAppointment: Omit<Appointment, 'id'>) => {
    try {
      if (useMockData) {
        const created: Appointment = {
          ...newAppointment,
          id: crypto.randomUUID()
        }
        setAppointments((prev) => [created, ...prev])
      } else {
        const created = await appointmentApi.create(newAppointment)
        setAppointments((prev) => [created, ...prev])
      }
    } catch (err) {
      alert('Failed to create appointment')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      if (useMockData) {
        setAppointments((prev) => prev.filter((a) => a.id !== id))
      } else {
        await appointmentApi.remove(id)
        setAppointments((prev) => prev.filter((a) => a.id !== id))
      }
    } catch {
      alert('Failed to delete appointment')
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Header />

        {useMockData ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Backend not reachable. Showing mock data until the Java API is connected.
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
            Loading appointments...
          </div>
        ) : (
          <div className="space-y-6">
            <StatsCards appointments={appointments} />
            <AppointmentForm onAdd={handleAdd} />
            <AppointmentList appointments={appointments} onDelete={handleDelete} />
          </div>
        )}
      </div>
    </div>
  )
}