// Seleccionamos los elementos que vamos a manipular
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const main = document.querySelector('.main');
const searchInput = document.querySelector('.search input');
const cards = document.querySelectorAll('.card');

// Función para alternar el menú de navegación
toggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
});

// Función para filtrar citas en la tabla mediante el campo de búsqueda
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.recentOrders tbody tr');

    rows.forEach(row => {
        const patientName = row.querySelector('td').textContent.toLowerCase();
        if (patientName.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Obtener el total de doctores
fetch('/api/doctors')
    .then(response => response.json())
    .then(data => {
        const totalDoctors = data.length; // Contar el número total de doctores
        document.getElementById('totalDoctors').innerText = totalDoctors; // Actualizar el valor en la tarjeta de doctores
    })
    .catch(error => console.error('Error fetching doctors:', error));

// Obtener el total de citas
fetch('/api/appointments')
    .then(response => response.json())
    .then(data => {
        const totalAppointments = data.length; // Contar el número total de citas
        document.getElementById('totalAppointments').innerText = totalAppointments; // Actualizar el valor en la tarjeta de citas
    })
    .catch(error => console.error('Error fetching appointments:', error));

// Obtener el total de pacientes
fetch('/api/patients')
    .then(response => response.json())
    .then(data => {
        const totalPatients = data.length; // Contar el número total de pacientes
        document.getElementById('totalPatients').innerText = totalPatients; // Actualizar el valor en la tarjeta de pacientes
    })
    .catch(error => console.error('Error fetching patients:', error));

// Obtener las ganancias totales (por ejemplo, podrías obtener las ganancias desde una ruta API que sume el total de ingresos)
fetch('/api/earnings')
    .then(response => response.json())
    .then(data => {
        const totalEarnings = data.total; // Suponiendo que tu API devuelva un valor `total` para las ganancias
        document.getElementById('totalEarnings').innerText = `$${totalEarnings}`; // Actualizar el valor en la tarjeta de ganancias
    })
    .catch(error => console.error('Error fetching earnings:', error));
