import express from 'express';
import {MiPerfil,Eliminar,EliminarProducto} from '../controller/miPerfilController.js'
import protegerRuta from '../midelware/protegerRuta.js'

const router=express.Router();


router.get('/propiedades/:id',protegerRuta,MiPerfil);
router.get('/eliminar',Eliminar)
router.delete('/eliminar',EliminarProducto)
export default router;