const posts = {
    primeros: new Map(),
    segundos: new Map(),
    postres: new Map(),
    
};
var pedidos = new Map();

let nextId = 0;

export function addPost(category, post) {
    let id = nextId++;
    post.id = id.toString();
    posts[category].set(post.id, post);
}

export function addPedidos(pedido, idplato) {
    let id = nextId++;
    pedido.idplato= idplato;
    pedido.id = id.toString();
    pedidos.set(pedido.id, pedido);
}

export function getPedidos(idplato) {
    let result= new Map();
    pedidos.forEach (function(pedido, id, pedidos){
        if (pedido.idplato == idplato){
            result.set(id,pedido)
        }
    })
    console.log(pedidos);
    console.log(idplato);
    console.log(result);
    return result;
}

export function editPost(oldCategory,category, post, postid) {
    post.id = postid;//           Y POSTID ES EL STRING   
    posts[oldCategory].delete(postid);
    posts[category].set(post.id, post);
    
}

export function correctPost (Obj) {
    let result = true;
    console.log (Obj);
    if ((!Obj.title) || (Obj.title =='')){
        result = false ;
    }
    if ((!Obj.ingredients) || (Obj.ingredients =='')){
        result = false ;
    }
    if ((!Obj.price) || (Obj.price =='')){
        result = false ;
    }
    if ((!Obj.img) || (Obj.img =='')){
        result = false ;
    }
    if ((!Obj.text) || (Obj.text =='')){
        result = false ;
    }
    if ((!Obj.category) || (Obj.category =='')){
        result = false ;
    }
    return result
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
addPost("primeros", { title: "Callos", img:"https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2023/03/callos-a-la-gallega.jpg",ingredients:"Morro, tocino, morcilla, chorizo", text:"Plato perfecto para el invierno", price: "15", category: "primeros"});
addPost("primeros", { title: "Calamares", img:"https://cdn.elcocinerocasero.com/imagen/receta/1000/2022-05-25-21-02-06/calamares-a-la-romana.jpeg", ingredients:"Harina, calamares", text:"Caseros, recibidos frescos de Galicia", price:"10", category: "primeros" });
addPost("primeros", { title: "Sopa Gallega", img:"https://www.spain.info/.content/imagenes/cabeceras-grandes/recetas/caldo-gallego-12065082-istock.jpg", ingredients:"Pollo", text:"Caldo picante perfecto para el invierno",price: "9", category: "primeros"});
addPost("primeros", { title: "Almejas", img:"https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/de-tapeo/ruta-empanada-santiago-compostela-la-radio-solleiros-abastos/gr-cms-media-featured_images-none-213ef37f-f233-4378-9a09-6042b491e436-02-alf_8438.jpg.transform/rp-rendition-lg/image.jpg", ingredients:"levadura, huevos, vino, atun, pimientos", text:"La empanada gallega consiste en una masa parecida al pan con un relleno que puede variar, aunque generalmente suele ser de atún con pimientos y cebolla", price:"10",category: "primeros"});
addPost("primeros", { title: "empanada", img:"https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/12/Pimientos-de-Padron.jpg", ingredients:"Pimientos de temporada, sal, aceite", text:"Pimientos del padron tipico de galicia", price:"9",category: "primeros"});
addPost("primeros", { title: "Pimientos del padron", img:"https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/12/cocido-gallego.jpg", ingredients:"garbanzos, fideos, compagno", text:"Cocido tipico gallego", price:"22",category: "primeros"});
addPost("primeros", { title: "Zorza", img:"https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/12/Zorza-gallega.jpg", ingredients:"Carne, chorizo, pimenton, aceite", text:"a zorza gallega es un picadillo que se hace con la carne con la cual se rellenan los chorizos.", price:"8",category: "primeros"});



addPost("segundos", { title: "Parrillada de Marisco", img:"https://www.restauranteelpinar.es/wp-content/uploads/2017/09/restaurante-el-pinar-parrillada-marisco-4.jpg",ingredients:"Gambones, gambas, navaja, vieira, choco", text:"Para 3 personas mínimo", price: "25", category: "segundos"});
addPost("segundos", { title: "Parrillada de Carne", img:"https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/07/16283202517103.jpg",ingredients:"Choricillos, panceta, costilla, churrasco", text:"Ahumado en nuestro fuego, mínimo para 2 personas", price: "25", category: "segundos" });
addPost("segundos", { title: "Bistec de Buey", img:"https://okdiario.com/img/recetas/2017/06/27/entrecot-de-buey-a-la-plancha.jpg",ingredients:"Chimichurri, filete de buey ahumado en fuego lento", text:"Carne de primera calidad de buey trashumante", price: "20", category: "segundos"});
addPost("segundos", { title: "Parrillada de Verdura", img:"https://i.blogs.es/0b605a/parrillada/450_1000.jpg",ingredients:"Espárragos, berenjena, calabacines, zanahoria, cebolla, patata", text:"Completa, opción perfecta para veganos", price: "13", category: "segundos" });
addPost("segundos", { title: "Xoubas", img:"https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/12/Xoubas-gallegas.jpg",ingredients:"Sardinas, aceite,sal", text:"Las xoubas, que no son otra cosa que las sardinas en gallego, un producto muy consumido en tierras gallegas.", price: "18", category: "segundos" });
addPost("segundos", { title: "Oreja", img:"https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/12/Orella-a-feira.jpg",ingredients:"Oreja, pimenton, aceite", text:"La orella a feira es una de las tapas más típicas de Galicia, siendo muy consumido en bares de tapas", price: "13", category: "segundos" });
addPost("segundos", { title: "Merluza a la gallega", img:"https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/12/Merluza-a-la-gallega.jpg",ingredients:"Espárragos, berenjena, calabacines, zanahoria, cebolla, patata", text:"Merluza, patatas, cebolla, ajos, laurel, pimentos de la vera, caldo de pesacdo, sal", price: "19", category: "segundos" });



addPost("postres", { title: "Tarta de queso" , img:"https://www.annarecetasfaciles.com/files/tarta-de-queso-de-la-vina.jpg",ingredients:"Queso tierno", text:"Con una capa exterior solida y un interior derretido irresistible", price: "6", category: "postres"});
addPost("postres", { title: "Tarta de Chocolate", img:"https://i.blogs.es/4c1903/tarta-de-chocolate-facil-y-rapida/840_560.jpg",ingredients:"Chocolate negro, con leche y brownie", text:"Tres chocolates, interior caliente, hecho de forma casera", price: "6", category: "postres" });
addPost("postres", { title: "Tiramisu", img:"https://recetasdecocina.elmundo.es/wp-content/uploads/2022/08/tiramisu-postre-italiano.jpg",ingredients:"Whisky irlandés, bizcocho, cacao", text:"Con whisky y cognac, receta casera", price: "8", category: "postres"});
addPost("postres", { title: "Bombones de chocolate", img:"https://s1.abcstatics.com/media/gurmesevilla/2014/05/bombones-chocolate.jpg",ingredients:"Chocolate con leche, chocolate", text:"Surtido de bombones de la casa", price: "4" , category: "postres"});
addPost("postres", { title: "tarta de Santiago", img:"https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/12/Tarta-de-Santiago.jpg",ingredients:"Huevos, Almendras, azucar", text:"La tarta de Santiago es un postre muy típico en Galicia.", price: "6" , category: "postres"});
addPost("postres", { title: "tarta de Mondeño", img:"https://www.tuscasasrurales.com/blog/wp-content/uploads/2019/12/Tarta-de-Mondonedo-galicia.jpg",ingredients:"bizcocho, almibar, hojaldre, almendras, cabello de angel, frutas", text:"La tarta de Mondoñedo es un exquisito postre típico del municipio del mismo nombre, Mondoñedo, situado en la provincia de Lugo ", price: "8" , category: "postres"});

// Obtener las publicaciones de una categoría específica