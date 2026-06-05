import { useState } from 'react'
import { Input } from './ui/Input'
import { Appointment } from '../types/appointment'

type FormState = Omit<Appointment, 'id'>

type Props = {
  onAdd: (appointment: FormState) => void
}

const initialState: FormState = {
  patientName: '',
  doctorName: '',
  department: '',
  date: '',
  time: '',
  status: 'Scheduled',
  notes: ''
}

export function AppointmentForm({ onAdd }: Props) {
  const [form, setForm] = useState<FormState>(initialState)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !form.patientName ||
      !form.doctorName ||
      !form.department ||
      !form.date ||
      !form.time
    ) {
      alert('Please fill all required fields')
      return
    }

    onAdd(form)
    setForm(initialState)
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Create Appointment</h2>

      <p>
        Add a new patient appointment to the tracker
      </p>

      <form onSubmit={handleSubmit} className="form-grid">

        <div className="input-group">
          <label>Patient Name *</label>
          <Input
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
          />
        </div>

        <div className="input-group">
          <label>Doctor Name *</label>
          <Input
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
            placeholder="Enter doctor name"
          />
        </div>

        <div className="input-group">
          <label>Department *</label>
          <Input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Cardiology / Dermatology"
          />
        </div>

        <div className="input-group">
          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Scheduled">
              Scheduled
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>

        <div className="input-group">
          <label>Date *</label>

          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Time *</label>

          <Input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />
        </div>

        <div
          className="input-group"
          style={{ gridColumn: '1 / -1' }}
        >
          <label>Notes</label>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add visit notes, symptoms, or follow-up details"
          />
        </div>

        <div
          style={{
            gridColumn: '1 / -1'
          }}
        >
          <button
            type="submit"
            className="primary-btn"
          >
            Save Appointment
          </button>
        </div>

      </form>
    </div>
  )
}

