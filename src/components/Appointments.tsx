import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Appointment {
  id?: number;
  start_time?: string;
  end_time?: string;
  staff_id?: number;
  client_id?: number;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array means this effect will run once, similar to componentDidMount

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {`ID: ${appointment.id}, Start Time: ${appointment.start_time}, End Time: ${appointment.end_time}, Staff ID: ${appointment.staff_id}, Client ID: ${appointment.client_id}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;