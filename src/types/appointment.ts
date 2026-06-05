export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled'

export interface Appointment {
  id: string
  patientName: string
  doctorName: string
  department: string
  date: string
  time: string
  status: AppointmentStatus
  notes?: string
}