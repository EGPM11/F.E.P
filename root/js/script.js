
document.getElementById('createDoctor').addEventListener('submit', function(e){
    e.preventDefault();

    const doctorName = document.getElementById('name').value;
    const specialty = document.getElementById('specialty').value;
    const phone = document.getElementById('phone').value;

    const data = {
        name: doctorName,
        specialty: specialty,
        phone: phone
    }
    console.log('data',data)

    addDoctor(data);
});

function addDoctor(data) {

    fetch('http://localhost:3000/doctors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
               'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Doctor agregado:', data);
        loadDoctors(); // Recargar la lista de doctores después de agregar uno nuevo
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function loadDoctors() {
    fetch('http://localhost:3000/doctors/batch')
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            const doctorCards = document.getElementById('doctorCards');
            doctorCards.innerHTML = ''; // Limpiar contenido previo

            data.forEach(doctor => {
                const doctorCard = document.createElement('div');
                doctorCard.className = 'cardBox'; // Aquí usas la clase que ya funciona bien para "person"
                doctorCard.innerHTML = `
                    <h3>${doctor.name}</h3>
                    <p>Especialidad: ${doctor.specialty}</p>
                    <p>Teléfono: ${doctor.phone}</p>
                `;
                doctorCards.appendChild(doctorCard);
            });
        })
        .catch(error => console.error('Error:', error));
}


document.addEventListener("DOMContentLoaded", () => {
    loadDoctors(); // Cargar doctores al inicio
});

