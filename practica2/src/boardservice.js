const posts = {
    primeros: new Map(),
    segundos: new Map(),
    postres: new Map(),
    
};
import fs from 'fs';
let pedidos = new Map();

let nextId = 0;

export function addPost(category, post) {
    let id = nextId++;
    post.id = id.toString();
    posts[category].set(post.id, post);
}

export function addPedidos(pedido) {
    let id = nextId++;
    pedido.id = id.toString();
    pedidos.set(pedido.id, pedido);
    savePedidosToFile();
}

function savePedidosToFile() {
    const pedidosArray = [...pedidos.values()];
    fs.writeFileSync(pedidosFilePath, JSON.stringify(pedidosArray), 'utf-8');
}

export function getPedidos() {
    return pedidos;
}

export function editPost(oldCategory,category, post, postid) {
    post.id = postid;//           Y POSTID ES EL STRING   
    posts[oldCategory].delete(postid);
    posts[category].set(post.id, post);
    
}

export function deletePost(category, id) {
    posts[category].delete(id);
}

export function getPosts(category) {
    return [...posts[category].values()];
}


export function getPost(category, id) {
    return posts[category].get(id);
}

// Agregar platos a las categorías
addPost("primeros", { title: "Callos", img:"https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2023/03/callos-a-la-gallega.jpg",ingredients:"Morro, tocino, morcilla, chorizo", text:"Plato perfecto para el invierno", price: "15", category: "primeros", pedidos});
addPost("primeros", { title: "Calamares", img:"https://cdn.elcocinerocasero.com/imagen/receta/1000/2022-05-25-21-02-06/calamares-a-la-romana.jpeg", ingredients:"Harina, calamares", text:"Caseros, recibidos frescos de Galicia", price:"10", category: "primeros" });
addPost("primeros", { title: "Sopa Gallega", img:"https://www.spain.info/.content/imagenes/cabeceras-grandes/recetas/caldo-gallego-12065082-istock.jpg", ingredients:"Pollo", text:"Caldo picante perfecto para el invierno",price: "9", category: "primeros"});
addPost("primeros", { title: "Almejas", img:"https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/09/almejas-marinera-3.jpg", ingredients:"Clochinas, perejil, caldo", text:"Almejas de temporadas recogidas esta misma semana", price:"16",category: "primeros"});

addPost("segundos", { title: "Parrillada de Marisco", img:"https://www.restauranteelpinar.es/wp-content/uploads/2017/09/restaurante-el-pinar-parrillada-marisco-4.jpg",ingredients:"Gambones, gambas, navaja, vieira, choco", text:"Para 3 personas mínimo", price: "25", category: "segundos"});
addPost("segundos", { title: "Parrillada de Carne", img:"https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/07/16283202517103.jpg",ingredients:"Choricillos, panceta, costilla, churrasco", text:"Ahumado en nuestro fuego, mínimo para 2 personas", price: "25", category: "segundos" });
addPost("segundos", { title: "Bistec de Buey", img:"https://okdiario.com/img/recetas/2017/06/27/entrecot-de-buey-a-la-plancha.jpg",ingredients:"Chimichurri, filete de buey ahumado en fuego lento", text:"Carne de primera calidad de buey trashumante", price: "20", category: "segundos"});
addPost("segundos", { title: "Parrillada de Verdura", img:"https://i.blogs.es/0b605a/parrillada/450_1000.jpg",ingredients:"Espárragos, berenjena, calabacines, zanahoria, cebolla, patata", text:"Completa, opción perfecta para veganos", price: "13", category: "segundos" });

addPost("postres", { title: "Tarta de queso" , img:"https://www.annarecetasfaciles.com/files/tarta-de-queso-de-la-vina.jpg",ingredients:"Queso tierno", text:"Con una capa exterior solida y un interior derretido irresistible", price: "6", category: "postres"});
addPost("postres", { title: "Tarta de Chocolate", img:"https://i.blogs.es/4c1903/tarta-de-chocolate-facil-y-rapida/840_560.jpg",ingredients:"Chocolate negro, con leche y brownie", text:"Tres chocolates, interior caliente, hecho de forma casera", price: "6", category: "postres" });
addPost("postres", { title: "Tiramisu", img:"https://recetasdecocina.elmundo.es/wp-content/uploads/2022/08/tiramisu-postre-italiano.jpg",ingredients:"Whisky irlandés, bizcocho, cacao", text:"Con whisky y cognac, receta casera", price: "8", category: "postres"});
addPost("postres", { title: "Bombones de chocolate", img:"https://s1.abcstatics.com/media/gurmesevilla/2014/05/bombones-chocolate.jpg",ingredients:"Chocolate con leche, chocolate", text:"Surtido de bombones de la casa", price: "4" , category: "postres"});

// Obtener las publicaciones de una categoría específica

