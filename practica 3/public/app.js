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
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.load-more-btn').forEach(btn => {
        btn.addEventListener('click', function () {
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
function showAvailabilityAndIngredientsAndpriceMessage(availabilityMessage, ingredientsMessage, priceMessage) {
    const availabilityElement = document.getElementById('availabilityMessage');
    const ingredientsElement = document.getElementById('ingredientsMessage');
    const priceElement = document.getElementById('priceMessage');  // Corregido: 'priceMessage' en lugar de 'pricemessage'
    availabilityElement.innerHTML = availabilityMessage;
    ingredientsElement.innerHTML = ingredientsMessage;
    priceElement.innerHTML = priceMessage;
}
function disableSubmitButton() {
    // Lógica para deshabilitar el botón de envío, por ejemplo:
    const submitButton = document.getElementById('submitBtn');
    if (submitButton) {
        submitButton.disabled = true;
    }
}
async function ComprobarForm() {
    // Resetear mensajes
    showAvailabilityAndIngredientsAndpriceMessage('', '', '');

    // Comprobar título
    let titleInput = document.getElementById('title');
    let title = titleInput.value.trim();

    console.log('Título:', title);

    // Mostrar mensaje si el título está vacío
    if (title === "") {
        showAvailabilityAndIngredientsAndpriceMessage('<p> El título no puede estar vacío </p>', '', '');
        disableSubmitButton();
        return;
    }

    // Comprobar disponibilidad del título
    const response = await fetch(`/abiableform?title=${title}`);
    const responseObj = await response.json();

    console.log('Respuesta del servidor:', responseObj);

    let availabilityMessage = responseObj.aviable ?
        '<p> Disponible </p>' :
        '<p> No disponible </p>';

    // Mostrar mensaje de disponibilidad
    showAvailabilityAndIngredientsAndpriceMessage(availabilityMessage, '', '');

    // Comprobar ingredientes
    let ingredientsInput = document.getElementById('ingredients');
    let ingredients = ingredientsInput.value.trim();
    console.log('Ingredientes:', ingredients);

    // Mostrar mensaje si los ingredientes están vacíos
    if (ingredients === "") {
        showAvailabilityAndIngredientsAndpriceMessage(
            document.getElementById('availabilityMessage').innerHTML,
            '<p> Los ingredientes no pueden estar vacíos </p>',
            document.getElementById('priceMessage').innerHTML
        );
        disableSubmitButton();
        return;
    }

    // Comprobar precio
    let priceInput = document.getElementById('price');
    let price = priceInput.value.trim();
    console.log('Precio:', price);

    // Mostrar mensaje si el precio está vacío
    if (price === "") {
        showAvailabilityAndIngredientsAndpriceMessage(
            document.getElementById('availabilityMessage').innerHTML,
            document.getElementById('ingredientsMessage').innerHTML,
            '<p> El precio no puede estar vacío </p>'
        );
        disableSubmitButton();
        return;
    }

    // Limpiar mensajes si todo está bien
    showAvailabilityAndIngredientsAndpriceMessage('<p> Disponible </p>', '', '');
}

