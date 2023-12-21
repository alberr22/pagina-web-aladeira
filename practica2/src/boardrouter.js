import express from 'express';
import * as boardService from './boardservice.js';

const router = express.Router();
router.use(express.urlencoded({ extended: true })); // Agrega esta línea para configurar body-parser

router.get('/', (_req, res) => {
    const primeros = boardService.getPosts('primeros');
    const segundos = boardService.getPosts('segundos');
    const postres = boardService.getPosts('postres');

    res.render('index', { primeros, segundos, postres });
});

router.post('/pedido/new/:id,:category', (req, res) => {
    let pedidos = boardService.getPedidos();

    // Verifica si el pedido ya existe antes de agregarlo nuevamente
    const pedidoExistente = Array.from(pedidos.values()).find(
        pedido => pedido.cantidad === req.body.cantidad && pedido.direccion === req.body.direccion && pedido.telefono === req.body.telefono
    );

    if (!pedidoExistente) {
        boardService.addPedidos(req.body);
    }

    pedidos = boardService.getPedidos();
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
    let pedidos = boardService.getPedidos();

    res.render('show_post', { post, pedidos: [...pedidos.values()] });
});

router.get('/post/:id,:category/delete', (req, res) => {
    boardService.deletePost(req.params.category,req.params.id);
    res.render('deleted_post');
});

export default router;

