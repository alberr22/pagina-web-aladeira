var plato = {
    title: false, 
    ingredients: false,
    price: false,
    rutaImagen:false ,

    
};
var cesta ={

}
async function loadAJAX(category, initialLoad = false) {
    const response = await fetch(`/cargar-mas?category=${category}`);
    const data = await response.json();

    const container = document.getElementById(`${category}Container`);
    const platosContainer = container.querySelector('.platos-container');
    const loadMoreBtn = container.querySelector('.load-more-btn');

    // Si es una carga inicial, limpia el contenedor antes de agregar nuevos elementos
    if (initialLoad) {
        platosContainer.innerHTML = '';
    }

    // Renderiza los platos en el contenedor
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
    const totalPlatosCount = data[category].length;

    // Si hay más platos para mostrar, muestra el botón "Mostrar más"
    if (shownCount < totalPlatosCount) {
        loadMoreBtn.style.display = 'block';
    } 
}

// Modifica el evento del botón "Mostrar más" para llamar a loadAJAX con la categoría correspondiente
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.load-more-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.dataset.category;
            loadAJAX(category);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const huecoCarrito = document.getElementById('carrito');
const huecoTotal = document.getElementById('totalPrice'); 
const nElementos = document.getElementById('productCounter')
nElementos.innerHTML = '<p>0</p>'; 
btnCart.addEventListener('click', () => {
    carrito().then(data=>{
        let total  = 0 ; 
        let newString = ''; 
        nElementos.innerHTML = '<p>'+data.length+'</p>'; 
        if (data.length == 0) {
            huecoCarrito.innerHTML = '<p> No hay nada en tu carrito </p>'; 
            huecoTotal.innerHTML = '<p>0</p>'
        }
        else{
        for (let i=0; i<data.length; i++){
            let infoPedido = data[i];
            let cantidad = infoPedido.cantidad;
            let id = infoPedido.idplato;
            plato(id).then(platocontenido =>{
                let nombre = platocontenido.title;
                let precio = (platocontenido.price * cantidad);
                total += precio ; 
                newString += ('<p>'+cantidad+' '+nombre+' '+precio+'</p>'); 
                huecoCarrito.innerHTML = newString;
                huecoTotal.innerHTML = total ; 

            })
        }
        
        }
    
    containerCartProducts.classList.toggle('hidden-cart');
    })
    async function plato(id){
        const response = await fetch(`/plato?id=${id}`);
        const data = await response.json();  
        return data;
    }
});
});





async function carrito ()  {
    
    const response = await fetch(`/carrito`);
    const data = await response.json();
    
    return data;
}

function loadMore(category) {
    loadAJAX(category);
}


function disableSubmitButton() {
    // Lógica para deshabilitar el botón de envío, por ejemplo:
    const submitButton = document.getElementById('submitBtn');
    if ((plato.title) && (plato.ingredients) && (plato.price) && (plato.ruta) && (plato.descripcion)){
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
    } else if (!/^[A-Z]/.test(title)) {
        // Check if the first letter is not uppercase
        const availabilityElement = document.getElementById('availabilityMessage');
        availabilityElement.innerHTML = "<p> La primera letra del título debe estar en mayúscula </p>";
        plato.title = false;
        disableSubmitButton();
        return;

    }

    // Comprobar disponibilidad del título
    const response = await fetch('/abiableform?title=${title}');
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

    } else if (campo == "ruta"){

        return(checkRuta());
    }
        if (campo == "descripcion") {
            return checkDescripcion();  // Llamamos directamente a la función checkDescripcion
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

function checkRuta (){
    let rutaInput = document.getElementById ('ruta');
    let ruta = rutaInput.value.trim();
    console.log('ruta:', ruta);
    const mensajeRuta = document.getElementById('rutaMessage');
    const regex = /^https:\/\/.*\.jpg$/;

    if (ruta === ""){
        const mensajeRuta = document.getElementById('rutaMessage');
        mensajeRuta.innerHTML = '<p>La ruta de la imagen del plato no puede estar vacia </p>';
        plato.ruta= false; 
    } else if (!regex.test(ruta)) {
        mensajeRuta.innerHTML = '<p>La ruta debe comenzar con "https://" y terminar con ".jpg"</p>';
        plato.ruta = false;
    } else {
        const mensajeRuta= document.getElementById('rutaMessage');
        mensajeRuta.innerHTML= '';
        plato.ruta= true;
    }
    disableSubmitButton();
    return;
}

function checkDescripcion() {
    let descripcionInput = document.getElementById('descripcion');
    let descripcion = descripcionInput.value.trim();

    console.log('Descripcion:', descripcion);
    const descriptionLength = descripcion.length;
    const mensajeDescripcion = document.getElementById('descripcionMessage');

    if (!descripcion) {
        mensajeDescripcion.innerHTML = 'La descripción del plato no puede estar vacía';
        plato.descripcion = false;
    } else if (descriptionLength < 50 || descriptionLength > 500) {
        mensajeDescripcion.innerHTML = 'La descripción debe tener entre 50 y 500 caracteres';
        plato.descripcion = false;
    } else {
        mensajeDescripcion.innerHTML = '';
        plato.descripcion = true;
    }

    disableSubmitButton();
    return;
}

