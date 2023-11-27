const posts = {
    primeros: new Map(),
    segundos: new Map(),
    postres: new Map(),
};

let nextId = 0;

function addPost(category, post) {
    let id = nextId++;
    post.id = id.toString();
    posts[category].set(post.id, post);
}
function deletePost(category, id) {
    posts[category].delete(id);
}



export function getPosts(category) {
    return [...posts[category].values()];
}


function getPost(category, id) {
    return posts[category].get(id);
}

// Agregar platos a las categorías
addPost("primeros", { title: "Callos", img:"https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2023/03/callos-a-la-gallega.jpg" });
addPost("primeros", { title: "Calamares", img:"https://cdn.elcocinerocasero.com/imagen/receta/1000/2022-05-25-21-02-06/calamares-a-la-romana.jpeg" });
addPost("primeros", { title: "Sopa Gallega", img:"https://www.spain.info/.content/imagenes/cabeceras-grandes/recetas/caldo-gallego-12065082-istock.jpg" });
addPost("primeros", { title: "Almejas", img:"https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/09/almejas-marinera-3.jpg"});

addPost("segundos", { title: "Parrillada de Marisco", img:"https://www.restauranteelpinar.es/wp-content/uploads/2017/09/restaurante-el-pinar-parrillada-marisco-4.jpg" });
addPost("segundos", { title: "Parrillada de Carne", img:"https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/07/16283202517103.jpg" });
addPost("segundos", { title: "Bistec de Buey", img:"https://okdiario.com/img/recetas/2017/06/27/entrecot-de-buey-a-la-plancha.jpg"});
addPost("segundos", { title: "Parrillada de Verdura", img:"https://i.blogs.es/0b605a/parrillada/450_1000.jpg" });

addPost("postres", { title: "Tarta de queso" , img:"https://www.annarecetasfaciles.com/files/tarta-de-queso-de-la-vina.jpg"});
addPost("postres", { title: "Tarta de Chocolate", img:"https://i.blogs.es/4c1903/tarta-de-chocolate-facil-y-rapida/840_560.jpg" });
addPost("postres", { title: "Tiramisu", img:"https://recetasdecocina.elmundo.es/wp-content/uploads/2022/08/tiramisu-postre-italiano.jpg" });
addPost("postres", { title: "Bombones de chocolate", img:"https://s1.abcstatics.com/media/gurmesevilla/2014/05/bombones-chocolate.jpg" });

// Obtener las publicaciones de una categoría específica
const primeros = getPosts("primeros");
const segundos = getPosts("segundos");
const postres = getPosts("postres");

