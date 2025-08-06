import express from 'express';
import {Mensajes,FormularioMensajes} from '../controller/mensajesController.js'
import protegerRuta from '../midelware/protegerRuta.js';

const router=express.Router();



router.get('/dataMensajes',Mensajes)
router.post('/dataMensajes',protegerRuta,FormularioMensajes);

export default router;