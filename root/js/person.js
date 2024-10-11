document.getElementById('createPatient').addEventListener('submit', function(e){
    e.preventDefault();

    // Asegúrate de que estos IDs coincidan con el HTML
    const patientName = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (!patientName || !address || !phone) {
        console.error('Todos los campos son obligatorios.');
        return;
    }

    const data = {
        name: patientName,
        address: address,
        phone: phone
    };

    addPatient(data);
});

function addPatient(data) {
    fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Verifica si la respuesta es JSON válida antes de intentar parsearla
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("La respuesta no es JSON válida");
        }
        return response.json();
    })
    .then(data => {
        console.log('Paciente agregado:', data);
        loadPatients(); // Recargar la lista de pacientes después de agregar uno nuevo
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


function loadPatients() {
    fetch('http://localhost:3000/patients/batch')
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            const patientCards = document.getElementById('patientCards');
            patientCards.innerHTML = ''; // Limpiar contenido previo

            data.forEach(patient => {
                const patientCard = document.createElement('div');
                patientCard.className = 'cardBox'; // Reutilizamos la clase
                patientCard.innerHTML = `
                    <h3>${patient.name}</h3>
                    <p>Dirección: ${patient.address}</p>
                    <p>Teléfono: ${patient.phone}</p>
                `;
                patientCards.appendChild(patientCard);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    loadPatients(); // Cargar pacientes al inicio
});
