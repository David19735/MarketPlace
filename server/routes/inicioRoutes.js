import express from 'express';
import protegerRuta from '../midelware/protegerRuta.js';
import {identificarUsuario} from '../controller/inicioController.js'

const router=express.Router();

//Identificar el usuario que inició sesión para enviarlo al contexto
router.get('/identificar',protegerRuta,identificarUsuario)

export default router