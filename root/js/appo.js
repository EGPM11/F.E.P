// Función para cargar citas desde el servidor y mostrarlas en la tabla
function loadAppointments() {
    fetch('/appointments')
        .then(response => response.json())
        .then(appointments => {
            const tableBody = document.getElementById('appointmentsTableBody');
            tableBody.innerHTML = ''; // Limpiar la tabla

            appointments.forEach(appointment => {
                const row = `
                    <tr>
                        <td>${appointment.patient_name}</td>
                        <td>${appointment.doctor_name}</td>
                        <td>${appointment.appointment_date}</td>
                        <td>${appointment.appointment_time}</td>
                        <td>${appointment.status}</td>
                        <td>
                            <button onclick="deleteAppointment(${appointment.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error al cargar las citas:', error));
}

// Función para agregar una nueva cita
document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar el envío del formulario por defecto

    const newAppointment = {
        patientName: document.getElementById('patientName').value,
        doctorName: document.getElementById('doctorName').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        appointmentTime: document.getElementById('appointmentTime').value,
        status: document.getElementById('status').value
    };

    fetch('/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
    })
        .then(response => {
            if (response.ok) {
                alert('Cita creada exitosamente');
                loadAppointments(); // Recargar citas
            } else {
                alert('Error al crear la cita');
            }
        })
        .catch(error => console.error('Error al crear la cita:', error));
});

// Función para eliminar una cita
function deleteAppointment(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
        fetch(`/appointments/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert('Cita eliminada');
                    loadAppointments(); // Recargar citas
                } else {
                    alert('Error al eliminar la cita');
                }
            })
            .catch(error => console.error('Error al eliminar la cita:', error));
    }
}
console.log("Fetch de citas iniciado");
fetch('/appointments')
    .then(response => {
        console.log("Respuesta del servidor obtenida", response);
        return response.json();
    })
    .then(appointments => {
        console.log("Citas recibidas", appointments);
        // Continuar procesando las citas...
    })
    .catch(error => console.error('Error al cargar las citas:', error));

// Cargar citas al iniciar la página
window.onload = loadAppointments;
