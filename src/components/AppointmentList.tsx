import { useMemo, useState } from 'react'
import { Appointment } from '../types/appointment'

type Props = {
  appointments: Appointment[]
  onDelete: (id: string) => void
}

export function AppointmentList({
  appointments,
  onDelete
}: Props) {
  const [search, setSearch] = useState('')

  const [filter, setFilter] = useState<
    'All' | Appointment['status']
  >('All')

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesSearch =
        a.patientName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        a.doctorName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        a.department
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesFilter =
        filter === 'All'
          ? true
          : a.status === filter

      return matchesSearch && matchesFilter
    })
  }, [appointments, search, filter])

  return (
    <div className="form-card">

      <h2 className="form-title">
        Appointments
      </h2>

      <p style={{ marginBottom: '20px' }}>
        Search, filter, and manage all appointments
      </p>

      <input
        type="text"
        placeholder="Search appointments..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-box"
      />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as any)
        }
        style={{
          padding: '12px',
          borderRadius: '12px',
          marginBottom: '20px',
          width: '100%'
        }}
      >
        <option value="All">
          All Appointments
        </option>

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

      <div className="appointments-grid">

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px'
            }}
          >
            No appointments found.
          </div>
        ) : (
          filtered.map((appointment) => (
            <div
              key={appointment.id}
              className="appointment-card"
            >

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}
              >

                <div>

                  <h3 className="patient-name">
                    {appointment.patientName}
                  </h3>

                  <p className="doctor-name">
                    Dr. {appointment.doctorName}
                  </p>

                  <p>
                    {appointment.department}
                  </p>

                  <p>
                    📅 {appointment.date}
                  </p>

                  <p>
                    ⏰ {appointment.time}
                  </p>

                  {appointment.notes && (
                    <p
                      style={{
                        marginTop: '10px'
                      }}
                    >
                      {appointment.notes}
                    </p>
                  )}

                </div>

                <div>

                  <span
                    className={`badge ${
                      appointment.status ===
                      'Scheduled'
                        ? 'badge-scheduled'
                        : appointment.status ===
                          'Completed'
                        ? 'badge-completed'
                        : 'badge-cancelled'
                    }`}
                  >
                    {appointment.status}
                  </span>

                  <br />
                  <br />

                  <button
                    className="danger-btn"
                    onClick={() =>
                      onDelete(
                        appointment.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  )
}
