import { Appointment } from '../types/appointment'

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Shivashankar Bukka',
    doctorName: 'Dr. Priya Rao',
    department: 'Cardiology',
    date: '2026-06-10',
    time: '10:30 AM',
    status: 'Scheduled',
    notes: 'Annual checkup'
  },
  {
    id: '2',
    patientName: 'Anita Kumar',
    doctorName: 'Dr. Meena Shetty',
    department: 'Dermatology',
    date: '2026-06-08',
    time: '02:15 PM',
    status: 'Completed',
    notes: 'Skin allergy follow-up'
  },
  {
    id: '3',
    patientName: 'Ravi Teja',
    doctorName: 'Dr. Arjun Singh',
    department: 'Orthopedics',
    date: '2026-06-12',
    time: '11:00 AM',
    status: 'Scheduled',
    notes: 'Knee pain consultation'
  }
]