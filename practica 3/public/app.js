async function loadAJAX(category) {
    const response = await fetch(`/cargar-mas?category=${category}`);
    const data = await response.json();

    const container = document.getElementById(`${category}Container`);
    const platosContainer = container.querySelector('.platos-container');
    const loadMoreBtn = container.querySelector('.load-more-btn');

    // Renderiza los nuevos platos en el contenedor existente
    data[category].forEach(plato => {
        const platoHTML = `
            <div class="plato">
                <img src="${plato.img}" alt="${plato.title}">
                <a href="post/${plato.id},${category}">${plato.title}</a>
            </div>
        `;
        platosContainer.insertAdjacentHTML('beforeend', platoHTML);
    });

    // Actualiza la cantidad de platos mostrados
    const shownCount = platosContainer.querySelectorAll('.plato').length;

    // Obtiene el recuento total de platos en la categoría
    const totalPlatosCount = data[category].length;

    // Si hay más platos para mostrar, muestra el botón "Mostrar más"
    if (shownCount < totalPlatosCount) {
        loadMoreBtn.style.display = 'block';
    } else {
        // Si no hay más platos, oculta el botón "Mostrar más"
        loadMoreBtn.style.display = 'none';
    }
}

// Asegúrate de que solo se llama a loadAJAX cuando se hace clic en el botón "Mostrar más"
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.load-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            loadAJAX(category);
        });
    });
});


function loadMore(category) {
    loadAJAX(category);
}
// Reemplaza este bloque en tu archivo app.js
// Modifica tu función ComprobarForm así



function showAvailabilityMessage(message) {
    // Lógica para mostrar el mensaje, por ejemplo, agregarlo a un elemento en el DOM
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message;
}

// Modifica tu función ComprobarForm así
async function ComprobarForm() {
    let titleInput = document.getElementById('title');
    let title = titleInput.value.trim();

    console.log('Título:', title); // Añade esta línea

    if (title === "") {
        // Si el título está vacío, muestra un mensaje y deshabilita el botón
        showAvailabilityMessage('<p> El título no puede estar vacío </p>');
        disableSubmitButton();
        return;
    }

    // Cambia la URL a la correcta
    const response = await fetch(`/abiableform?title=${title}`);
    const responseObj = await response.json();

    console.log('Respuesta del servidor:', responseObj); // Añade esta línea

    let message = responseObj.aviable ?
        '<p> Disponible </p>' :
        '<p> No disponible </p>';

    showAvailabilityMessage(message);
}