import Mensaje from '../models/Mensaje.js'


const Mensajes=(req,res)=>{

    return res.json({csrfToken:req.csrfToken()})
}

const FormularioMensajes=async(req,res)=>{

    const {mensaje,usuarioId,destinatarioId}=req.body;

    if(!req.usuario){
        return res.json({mensajes:['Para poder enviar un mensaje tienes que iniciar sesión','Inicia sesión o crea una cuenta'],tipo:'error1'})
    }
    
    if(!usuarioId || !destinatarioId){
        return res.json({mensajes:['No has iniciado sesión','O bien no estás enviando un mensaje a nadie'],tipo:'error1'})
    }

    const mensajeGuardado=await Mensaje.create({
        mensaje,
        usuarioId,
        destinatarioId
    })
    
    return res.json({mensajes:['Mensaje enviado','Espera a que el usuario te contacte'],tipo:'exito1'})
}

export {
    Mensajes,
    FormularioMensajes
}