import express from 'express';
import * as boardService from './boardService.js';

const router = express.Router();

router.get('/', (req, res) => {
    const primeros = boardService.getPosts('primeros');
    const segundos = boardService.getPosts('segundos');
    const postres = boardService.getPosts('postres');

    res.render('index', { primeros, segundos, postres });
});

router.post('/post/new', (req, res) => {
    let {title,ingredients, price, img,text,category} = req.body;
    boardService.addPost(category,{title, img});
    res.render('saved_post', { title,img });
});

router.get('/post/:id', (req, res) => {
    let post = boardService.getPost(req.params.id);
    res.render('show_post', { post });
});

router.get('/post/:id/delete', (req, res) => {
    boardService.deletePost(req.params.id);
    res.render('deleted_post');
});

export default router;

