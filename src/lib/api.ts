import axios from 'axios'
import { Appointment } from '../types/appointment'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const appointmentApi = {
  async getAll(): Promise<Appointment[]> {
    const res = await api.get('/appointments')
    return res.data
  },

  async create(payload: Omit<Appointment, 'id'>): Promise<Appointment> {
    const res = await api.post('/appointments', payload)
    return res.data
  },

  async update(id: string, payload: Partial<Appointment>): Promise<Appointment> {
    const res = await api.put(`/appointments/${id}`, payload)
    return res.data
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/appointments/${id}`)
  }
}