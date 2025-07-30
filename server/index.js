import express from 'express';
import autentificacionRoutes from './routes/autentificacionRoutes.js';
import postRoutes from './routes/postRoutes.js';
import inicioRoutes from './routes/inicioRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import db from './config/db.js';
import {exit} from 'node:process'
import fs from 'fs';
import path from 'path';


//Iniciar la app
const app=express();
const port=4000;

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static('uploads'));

try {
    await db.authenticate();
    await db.sync();
    console.log("Conexión correcta a la base de datos");
} catch (error) {
    console.log(error)
}


//Habilitar lectura de datos de formulario
app.use(express.urlencoded({extended:true}));

//Habilitar cookies
app.use(cookieParser());

//Habilitar NextJs
app.use(express.json());

app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
))

//Habilitar CSRF
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.use('/autentificacion',autentificacionRoutes);
app.use('/post',postRoutes);
app.use('/inicio',inicioRoutes);

app.listen(port,()=>{
    console.log("Servidor funcionando en el puerto "+port);
})