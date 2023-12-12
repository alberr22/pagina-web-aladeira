import express from 'express';
import * as boardService from './boardService.js';

const router = express.Router();

router.get('/', (req, res) => {
    const primeros = boardService.getPosts('primeros');
    const segundos = boardService.getPosts('segundos');
    const postres = boardService.getPosts('postres');

    res.render('index', { primeros, segundos, postres });
});

router.post('/pedido/new/:id,:category', (req, res) => {
    boardService.addPedidos(req.body);
    let pedidos = boardService.getPedidos();
    let post = boardService.getPost(req.params.category,req.params.id);
    console.log(pedidos);
    res.render('show_post', { post, pedidos });
    
});



router.get('/post/:id,:category/edit', (req, res) => {
    let post = boardService.getPost(req.params.category,req.params.id);
    console.log(req.params.category,req.params.id);
    res.render('edit_post', { post });
});

router.post('/post/new', (req, res) => {
    let {title,ingredients, price, img,text,category} = req.body;
    boardService.addPost(category,{title, ingredients, price, img, text,category});
    res.render('saved_post');
});

router.post('/post/:id,:category/edit', (req, res) => {
    let {title,ingredients, price, img,text,category} = req.body;
    boardService.editPost(req.params.category,category,{title, ingredients, price, img, text,category},req.params.id);
    console.log(req.params.category,category);
    res.render('saved_post');
});

router.get('/post/:id,:category', (req, res) => {
    let post = boardService.getPost(req.params.category,req.params.id);
    res.render('show_post', { post });
});

router.get('/post/:id,:category/delete', (req, res) => {
    boardService.deletePost(req.params.category,req.params.id);
    res.render('deleted_post');
});

export default router;

