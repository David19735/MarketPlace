import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';
import {generarId,generarJwt} from '../helpers/tokens.js'
import {emailRegistro,emailPassword} from '../helpers/emails.js'
import bcrypt from 'bcrypt'

//Registro
const Registro=async(req,res)=>{

    return res.json({csrfToken:req.csrfToken()})
}

const FormularioRegistro=async(req,res)=>{

   const {nombre,apellido1,apellido2,email,password,password2}=req.body;

   await check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').run(req);
   await check('apellido1').notEmpty().withMessage('El primer apellido no puede estar vacío').run(req);
   await check('apellido2').notEmpty().withMessage('El Segundo apellido no puede estar vacío').run(req);
   await check('password').isLength({min:8}).withMessage('La contraseña debe contener al menos 8 carácteres').run(req);
   await check('email').isEmail().withMessage('El correo electrónico es obligatorio').run(req);
   await check('password2').equals(password).withMessage('Las contraseñas no coinciden').run(req);

   let resultado=validationResult(req).array();

    if(resultado.length>0){
        return res.json({mensajes:resultado,tipo:'error'})
    }

    const usuarioExistente=await Usuario.findOne({where:{email}})

    if(usuarioExistente){

       
        return res.json({mensajes:['El correo electrónico ya está asociado a un perfil','Realiza el registro con otro correo electrónico'],tipo:'error1'})
    }

    const usuario=await Usuario.create({
        nombre,
        apellido1,
        apellido2,
        email,
        password,
        token:generarId(),
        confirmado:0
    })

    emailRegistro({
        nombre:usuario.nombre,
        email:usuario.email,
        token:usuario.token
    })
        
    return res.json({mensajes:['Usuario registrado con éxito','Hemos enviado un correo electrónico en tu bandeja de entrada para confirmar tu cuenta'],tipo:'exito'})
}

//Confirmar cuenta

const ConfirmarCuenta=async(req,res)=>{

 const {token}=req.params;

    const usuario=await Usuario.findOne({where:{token}})

    if(!usuario){

       return res.json({confirmar:false})
    }

    usuario.token=null;
    usuario.confirmado=1;
    usuario.save();
    return res.json({csrfToken:req.csrfToken(),confirmar:true})
}


//Iniciar sesión
const IniciarSesion=async(req,res)=>{

    return res.json({csrfToken:req.csrfToken()})
}

const FormularioIniciarSesion=async(req,res)=>{

    const {email,password}=req.body;

    const usuario=await Usuario.findOne({where:{email}})

    if(!usuario){

        return res.json({mensajes:['El correo ingresado no existe','Verifica si estás escribiendo correctamente el correo o si no lo tienes registrado'],tipo:'error1'})
    }   
    if(!usuario.confirmado){

        return res.json({mensajes:['El usuario no se encuentra registrado','Ingresa a tu correo para confirmar tu cuenta'],tipo:'error1'})
    }
    if(!usuario.verificarPassword(password)){

        return res.json({mensajes:['La contraseña es incorrecta','Ingresa nuevamente la contraseña o si la olvidaste, puedes generar un cambio de contraseña'], tipo:'error1'})
    }

     //Generando el jwt

    const token=generarJwt({id:usuario.id,nombre:usuario.nombre})

     //Almacenar token en cookie
   res.cookie("token", token, {
    httpOnly: true, // Evita que el token sea accesible desde JavaScript en el navegador
    secure: true, // Solo en HTTPS (desactiva en local si es necesario)
    sameSite: "Strict", // Evita envío de cookies en solicitudes de terceros
  });

    return res.json({mensajes:['Datos correctos','Has iniciado sesión'],tipo:'sesion'})
}


//Olvide contraseña
const OlvidePassword=(req,res)=>{

    return res.json({csrfToken:req.csrfToken()})
}

const FormularioOlvidePassword=async(req,res)=>{

   const {email}=req.body;

   const usuario=await Usuario.findOne({where:{email}});
    if(!usuario){
        return res.json({mensajes:['El correo electrónico no se encuentra registrado','Verifica el email o registrate'],tipo:'error1'})
    }

    const token=generarId();
    usuario.token=token;
    usuario.save();

    emailPassword({
        nombre:usuario.nombre,
        token:usuario.token,
        email:usuario.email
    })

    return res.json({mensajes:['Hemos enviado un correo electrónico para que puedas realizar el cambio de contraseña','Dirigete a tu bandeja de entrada e ingresa al link'],tipo:'exito'})
}

const CambiarPassword=async(req,res)=>{

    const {token}=req.params
    
    const usuario=await Usuario.findOne({where:{token}})
    if(!usuario){
        return res.json({correcto:false})
    }

    return res.json({correcto:true,csrfToken:req.csrfToken()})
}

const FormularioCambiarPassword=async(req,res)=>{

    const {password,password2}=req.body;
    const {token}= req.params;

   await check('password').isLength({min:8}).withMessage('La contraseña debe contener al menos 8 carácteres').run(req);
   await check('password2').equals(password).withMessage('Las contraseñas no coinciden').run(req);

     let resultado=validationResult(req).array();

    if(resultado.length>0){
        return res.json({mensajes:resultado,tipo:'error'})
    }

    const usuario=await Usuario.findOne({where:{token}})

    const salt=await bcrypt.genSalt(10)
    usuario.password=await bcrypt.hash(password,salt)
    usuario.token=null;
    await usuario.save();

    return res.json({mensajes:['Contraseña cambiada con éxito','Inicia sesión'],tipo:'exito'})
   
}

const cerrarSesion=(req,res)=>{

    return res.json({csrfToken:req.csrfToken()})
}

const BotonCerrarSesion=(req,res)=>{
    res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',           // IMPORTANTE: debe ser el mismo path usado al guardar el token
    maxAge: 0,           // Esto elimina la cookie
  });

  res.json({ mensaje: 'Sesión cerrada correctamente' });
}

export{
    Registro,
    IniciarSesion,
    OlvidePassword,
    FormularioRegistro,
    ConfirmarCuenta,
    FormularioOlvidePassword,
    CambiarPassword,
    FormularioCambiarPassword,
    FormularioIniciarSesion,
    cerrarSesion,
    BotonCerrarSesion
}