import express from 'express';
import {MiPerfil,Eliminar,EliminarProducto,EditarPublicado,EdicionProducto,FormularioEdicionProducto} from '../controller/miPerfilController.js'
import protegerRuta from '../midelware/protegerRuta.js'

const router=express.Router();


router.get('/propiedades/:id',protegerRuta,MiPerfil);
router.get('/eliminar',Eliminar);
router.delete('/eliminar',EliminarProducto);

//Edicion de propiedad pública
router.patch('/editar',EditarPublicado)

//Edición de datos
router.get('/edicion/:id',EdicionProducto)
router.put('/edicion/:id',FormularioEdicionProducto);


export default router;