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

