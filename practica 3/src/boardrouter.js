import express from 'express';
import * as boardService from './boardservice.js';


const router = express.Router();
router.use(express.urlencoded({ extended: true })); // Agrega esta línea para configurar body-parser
let existingplatos= ['callos'];
let shownPrimeros= 3;
let shownSegundos=3;
let shownPostres=3;
router.get('/', (_req, res) => {
    const primeros = boardService.getPosts('primeros').slice(0,shownPrimeros);
    const segundos = boardService.getPosts('segundos').slice(0,shownSegundos);
    const postres = boardService.getPosts('postres').slice(0,shownPostres);

    res.render('index', { primeros, segundos, postres });
});

router.get('/abiableform', (req, res) => {
    let title = req.query.title;
    
    // Verificar si el título es una cadena no vacía antes de considerarlo
    let availableForm = title && title.trim() !== '' && existingplatos.indexOf(title) === -1;

    let response = {
        aviable: availableForm
    } 
    res.json(response)
});

router.get('/search', (req, res) => {
    
    let input = req.query.input;
    let platos = elementos.searchElems(input);
    
    res.render('index', {
        platos: platos
    })
})

router.get('/cargar-mas', (req, res) => {
    const { category } = req.query;
    let result;

    // Obtén los platos actualizados según la categoría
    if (category === 'primeros') {
        result = getUpdatedPlatos('primeros', shownPrimeros);
        shownPrimeros += result.length;
    } else if (category === 'segundos') {
        result = getUpdatedPlatos('segundos', shownSegundos);
        shownSegundos += result.length;
    } else if (category === 'postres') {
        result = getUpdatedPlatos('postres', shownPostres);
        shownPostres += result.length;
    }

    // Envía la respuesta al cliente en formato JSON
    res.json({ [category]: result });
});

// Asegúrate de devolver la cantidad correcta de platos en la función getUpdatedPlatos
function getUpdatedPlatos(category, shownCount) {
    const allPlatos = boardService.getPosts(category);
    const newPlatos = allPlatos.slice(shownCount, shownCount + 1);  // Cambia el número a la cantidad que desees mostrar
    return newPlatos;
}




router.post('/pedido/new/:id,:category', (req, res) => {
    let pedidos = boardService.getPedidos();

    // Verifica si el pedido ya existe antes de agregarlo nuevamente
    const pedidoExistente = Array.from(pedidos.values()).find(
        pedido => pedido.cantidad === req.body.cantidad && pedido.direccion === req.body.direccion && pedido.telefono === req.body.telefono
    );

    if (!pedidoExistente) {
        boardService.addPedidos(req.body, req.params.id);
    }
    
    pedidos = boardService.getPedidos(req.params.id);
    let post = boardService.getPost(req.params.category, req.params.id);
    console.log(pedidos);
    res.render('show_post', { post, pedidos: [...pedidos.values()] });
});



router.get('/post/:id,:category/edit', (req, res) => {
    let post = boardService.getPost(req.params.category,req.params.id);
    console.log(req.params.category,req.params.id);
    res.render('edit_post', { post });
});


router.post('/post/new', (req, res) => {
    let {title,ingredients, price, img,text,category} = req.body;

    if  (boardService.correctPost (req.body)) {
        boardService.addPost(category,{title, ingredients, price, img, text,category});
        res.render('saved_post');
    } else {
        res.render('error_post')
    }
    
});

router.post('/post/:id,:category/edit', (req, res) => {
    let {title,ingredients, price, img,text,category} = req.body;
    boardService.editPost(req.params.category,category,{title, ingredients, price, img, text,category},req.params.id);
    console.log(req.params.category,category);
    res.render('saved_post');
});

router.get('/post/:id,:category', (req, res) => {
    let post = boardService.getPost(req.params.category,req.params.id);
    let pedidos = boardService.getPedidos(req.params.id);

    res.render('show_post', { post, pedidos: [...pedidos.values()] });
});

router.get('/post/:id,:category/delete', (req, res) => {
    boardService.deletePost(req.params.category,req.params.id);
    res.render('deleted_post');
});

export default router;

