import express from 'express';
import {Post,FormularioPost} from '../controller/postController.js';
import protegerRuta from '../midelware/protegerRuta.js';

const router=express.Router();

//Publicar post
router.get('/publicar',protegerRuta,Post);
router.post('/publicar',FormularioPost);



export default router;