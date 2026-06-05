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
  <div className="dashboard-container">

    <div className="hero-header">
      <h1>🏥 Health & Appointment Tracker</h1>
      <p>
        Manage patients, appointments, health records and schedules.
      </p>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">{appointments.length}</div>
        <div className="stat-title">Total Appointments</div>
      </div>

      <div className="stat-card">
        <div className="stat-number">
          {appointments.filter(a => a.status === "Scheduled").length}
        </div>
        <div className="stat-title">Scheduled</div>
      </div>

      <div className="stat-card">
        <div className="stat-number">
          {appointments.filter(a => a.status === "Completed").length}
        </div>
        <div className="stat-title">Completed</div>
      </div>

      <div className="stat-card">
        <div className="stat-number">
          {appointments.filter(a => a.status === "Cancelled").length}
        </div>
        <div className="stat-title">Cancelled</div>
      </div>
    </div>

    <AppointmentForm onAdd={handleAdd} />

    <AppointmentList
      appointments={appointments}
      onDelete={handleDelete}
    />

  </div>
)
