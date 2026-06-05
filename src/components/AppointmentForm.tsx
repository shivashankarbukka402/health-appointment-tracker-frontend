import { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card } from './ui/Card'
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.patientName || !form.doctorName || !form.department || !form.date || !form.time) {
      alert('Please fill all required fields')
      return
    }

    onAdd(form)
    setForm(initialState)
  }

  return (
    <div className="form-card">
      <h2 className="text-xl font-semibold text-slate-900">Create Appointment</h2>
      <p className="mt-1 text-sm text-slate-500">Add a new patient appointment to the tracker</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Patient Name *</label>
          <Input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Enter patient name" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Doctor Name *</label>
          <Input name="doctorName" value={form.doctorName} onChange={handleChange} placeholder="Enter doctor name" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Department *</label>
          <Input name="department" value={form.department} onChange={handleChange} placeholder="Cardiology / Dermatology..." />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Date *</label>
          <Input type="date" name="date" value={form.date} onChange={handleChange} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Time *</label>
          <Input type="time" name="time" value={form.time} onChange={handleChange} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add visit notes, symptoms, or follow-up details"
            className="min-h-28 w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">
            Save Appointment
          </Button>
        </div>
  )

