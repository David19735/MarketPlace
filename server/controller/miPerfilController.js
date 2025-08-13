import {Producto,Imagen} from '../models/index.js'

const MiPerfil=async(req,res)=>{

    if(!req.usuario){
        return res.json({msg:'Inicia sesión'})
    }
    const {id}=req.params;
    
    if(!id){
        return res.json({msg:'Inicia sesión'})
    }

    const productos=await Producto.findAll({where:{usuarioId:id},
    include:[
        {
            model:Imagen,
            as:'imagenes',
            attributes:['id','nombre']
        }
    ]
    });

    return res.json({productos,csrfToken:req.csrfToken()})
}


const Eliminar=(req,res)=>{

    return res.json({csrfToken:req.csrfToken()})
}

const EliminarProducto=async(req,res)=>{

    const {id}=req.body;
    const productoAeliminar=await Producto.findByPk(id);

    if(!productoAeliminar){
        return({mensajes:['El producto que intentas eliminar no existe','Verifica el producto a eliminar'],tipo:'error1'})
    }

    

    return res.json({msg:'Contectado'})
}


export{MiPerfil,Eliminar,EliminarProducto}