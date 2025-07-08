import express from 'express';
import {Post} from '../controller/postController.js';

const router=express.Router();

router.get('/publicar',Post);

export default router;