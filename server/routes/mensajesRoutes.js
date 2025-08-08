import express from 'express';
import {Mensajes,FormularioMensajes,MensajesPrivados} from '../controller/mensajesController.js'
import protegerRuta from '../midelware/protegerRuta.js';

const router=express.Router();



router.get('/dataMensajes',Mensajes)
router.post('/dataMensajes',protegerRuta,FormularioMensajes);

router.get('/data/:id',MensajesPrivados);

export default router;