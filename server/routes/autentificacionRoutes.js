import express from 'express';
import { Registro,IniciarSesion, OlvidePassword,FormularioRegistro,ConfirmarCuenta,FormularioOlvidePassword,CambiarPassword,FormularioCambiarPassword,FormularioIniciarSesion,cerrarSesion,BotonCerrarSesion } from '../controller/autentificacionController.js';

const router=express.Router();


//Registro 
router.get('/registro',Registro);
router.post('/registro',FormularioRegistro)

//Confirmar cuenta
router.get('/registro/:token',ConfirmarCuenta)

//Inicio de sesión
router.get('/inicio_sesion',IniciarSesion);
router.post('/inicio_sesion',FormularioIniciarSesion)

//Olvide contraseña
router.get('/olvide_password',OlvidePassword);
router.post('/olvide_password',FormularioOlvidePassword)

//Generar el cambio de contraseña
router.get('/olvide_password/:token',CambiarPassword)
router.post('/olvide_password/:token',FormularioCambiarPassword)

//Cerrar Sesión
router.get('/cerrar_sesion',cerrarSesion)
router.post('/cerrar_sesion',BotonCerrarSesion)

export default router;