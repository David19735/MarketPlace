import express from 'express';
import {Post,FormularioPost} from '../controller/postController.js';
import protegerRuta from '../midelware/protegerRuta.js';
import {upload} from '../midelware/upload.js';

const router=express.Router();

//Publicar post
router.get('/publicar',protegerRuta,Post);
router.post('/publicar',upload.array('imagenes', 3),FormularioPost);



export default router;