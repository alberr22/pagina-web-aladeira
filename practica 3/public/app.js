var plato = {
    title: false, 
    ingredients: false,
    price: false,
    rutaImagen:false ,

    
};
var cesta ={

}


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
    if ((plato.title) && (plato.ingredients) && (plato.price) && (plato.ruta)){
        submitButton.disabled= false;
    } else{
        submitButton.disabled = true;
    }
    console.log(plato);
}
async function ComprobarForm(campo) {
    // Resetear mensajes
    
    //showAvailabilityAndIngredientsAndpriceMessage('', '', '');

    if (campo== "title") {
    // Comprobar título
    let titleInput = document.getElementById('title');
    let title = titleInput.value.trim();

    console.log('Título:', title);

    // Mostrar mensaje si el título está vacío
    if (title === "") {
        //showAvailabilityAndIngredientsAndpriceMessage('<p> El título no puede estar vacío </p>', '', '');
        const availabilityElement = document.getElementById('availabilityMessage');
        availabilityElement.innerHTML = "<p> El título no puede estar vacío </p>";
        plato.title=false;
        disableSubmitButton();
        return;
    }

    // Comprobar disponibilidad del título
    const response = await fetch(`/abiableform?title=${title}`);
    const responseObj = await response.json();

    console.log('Respuesta del servidor:', responseObj);
        plato.title=false;
        
       let mensaje =  '<p> No disponible </p>';

       if (responseObj.aviable ){
            mensaje = '<p> Disponible </p>';
            plato.title= true;
       } 
       const availabilityElement = document.getElementById('availabilityMessage');
        availabilityElement.innerHTML = mensaje;
        disableSubmitButton();
    // Mostrar mensaje de disponibilidad
    //showAvailabilityAndIngredientsAndpriceMessage(availabilityMessage, '', '');
    } else if ( campo == "ingredients") {

        return(checkIngredients());

    } else if (campo == "price") {

        return(checkPrice());

    } else if (campo == "rutaImagen"){

        return(checkRutaImagen());
    }

    }


 function checkIngredients(){
    let ingredientsInput = document.getElementById('ingredients');
    let ingredients = ingredientsInput.value.trim();
    console.log('ingredientes:', ingredients);

    // Mostrar mensaje si los ingredientes están vacíos
    if (ingredients === "") {
       
        const mensajeIngredientes = document.getElementById('ingredientsMessage');
        mensajeIngredientes.innerHTML = '<p> Los ingredientes no pueden estar vacíos </p>';
        plato.ingredients=false;
        
        
    }else {
        const mensajeIngredientes = document.getElementById('ingredientsMessage');
        mensajeIngredientes.innerHTML = '';
        plato.ingredients=true;
    }
    disableSubmitButton();
    return;
}

function checkPrice (){
    let priceInput = document.getElementById ('price');
    let price = priceInput.value.trim();
    console.log('price', price);

    if (price === ""){
        const mensajePrecio = document.getElementById('priceMessage');
        mensajePrecio.innerHTML = '<p> El precio no puede estra vacio </p>';
        plato.price= false; 
    } else if (isNaN(Number(price))){
        const mensajePrecio= document.getElementById('priceMessage');
        mensajePrecio.innerHTML = '<p> El precio debe der un numero</p>';
        plato.price=false;
    } else {
        const mensajePrecio= document.getElementById('priceMessage')
        mensajePrecio.innerHTML= '';
        plato.price= true;
    }
    disableSubmitButton();
    return;
}

function checkRutaImagen (){
    let rutaInput = document.getElementById('rutaImagen');
    let rutaImagen = rutaInput.value.trim();

    console.log('rutaImagen', rutaImagen);

    if (rutaImagen === ""){
        const mensajeRuta = document.getElementById('rutaImagenMessage');
        mensajeRuta.innerHTML = '<p> La ruta de la imagen no puede estar vacia </p>';
        plato.rutaImagen= false;
    } else {
        const mensajeRuta = document.getElementById('rutaImagenMessage');
        mensajeRuta.innerHTML = '';
        plato.rutaImagen= true;

    }
    disableSubmitButton();
    return;

}