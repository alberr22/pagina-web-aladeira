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
