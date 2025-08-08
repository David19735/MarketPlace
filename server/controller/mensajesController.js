import { Mensaje, Usuario,Producto,Imagen } from '../models/index.js';


const Mensajes=(req,res)=>{

    return res.json({csrfToken:req.csrfToken()})
}

const FormularioMensajes=async(req,res)=>{

    const {mensaje,usuarioId,destinatarioId,productoId}=req.body;

    if(!req.usuario){
        return res.json({mensajes:['Para poder enviar un mensaje tienes que iniciar sesión','Inicia sesión o crea una cuenta'],tipo:'error1'})
    }
    
    if(!usuarioId || !destinatarioId){
        return res.json({mensajes:['No has iniciado sesión','O bien no estás enviando un mensaje a nadie'],tipo:'error1'})
    }

    const mensajeGuardado=await Mensaje.create({
        mensaje,
        usuarioId,
        destinatarioId,
        productoId
    })
    
    return res.json({mensajes:['Mensaje enviado','Espera a que el usuario te contacte'],tipo:'exito1'})
}

const MensajesPrivados = async (req, res) => {
  const { id } = req.params;


  try {
    const mensajes = await Mensaje.findAll({
      where: { destinatarioId: id },
      include: [
        {
          model: Usuario,
          as: 'remitente',
          attributes: ['id', 'nombre', 'email','createdAt'] // Ajusta según tu modelo
        },
        {
          model: Usuario,
          as: 'destinatario',
          attributes: ['id', 'nombre', 'email']
        },{
          model:Producto,
          as:'producto',
          attributes:['id','nombre']
        }
      ],
      order: [['createdAt', 'DESC']] // opcional: ordenar por fecha
    });

    const imagenes=await Imagen.findAll();

    return res.json({mensajes,imagenes});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al obtener los mensajes privados' });
  }
};

export {
    Mensajes,
    FormularioMensajes,
    MensajesPrivados
}