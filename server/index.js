import express from 'express';
import autentificacionRoutes from './routes/autentificacionRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import db from './config/db.js';

//Iniciar la app
const app=express();
const port=4000;


try {
    await db.authenticate();
    db.sync()
    console.log("Conexión correcta a la base de datos");
} catch (error) {
    console.log(error);
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

app.listen(port,()=>{
    console.log("Servidor funcionando en el puerto "+port);
})