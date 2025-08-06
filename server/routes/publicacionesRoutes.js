import express from 'express';
import {Prueba} from '../controller/publicacionesController.js';

const router=express.Router();



router.get('/general',Prueba)

export default router;