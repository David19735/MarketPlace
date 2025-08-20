import {Producto,Imagen,Categoria,Trato,Precio, Mensaje} from '../models/index.js'

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
    await Mensaje.destroy({where:{productoId:id}})
    await Imagen.destroy({where:{productoId:id}})
    await productoAeliminar.destroy()

    return res.json({msg:'Contectado'})
}


const EditarPublicado=async(req,res)=>{

    const {id}=req.body;

    const producto=await Producto.findByPk(id)
    if(!producto){
        return res.json({msg:'El producto no existe',tipo:'error'})
    }

    producto.publicado=!producto.publicado;
    producto.save();
    
    return res.json({msg:'Cambiando publicado',tipo:'exito'})
}


const EdicionProducto=async(req,res)=>{

    const {id}=await req.params;
    console.log(id);

    const productoAeditar=await Producto.findByPk(id);
    
    if(!productoAeditar){
        return res.json({producto:null})
    }

    const categorias=await Categoria.findAll();
    const precios=await Precio.findAll()
    const tratos=await Trato.findAll();

    return res.json({msg:'Contectado al back con id: '+id,producto:productoAeditar,categorias,precios,tratos,csrfToken:req.csrfToken()})
}


const FormularioEdicionProducto=async(req,res)=>{

    const {id}=req.params;
    const {nombre,categoriaId,precioId,tratoId,descripcion,domicilio,lat,lng}=req.body;
    
    const producto=await Producto.findByPk(id);
    if(!producto){
        return res.json({msg:'El producto no existe',tipo:'error'})
    }

    console.log(nombre,categoriaId,precioId,tratoId,descripcion,domicilio,lat,lng);

   
    producto.nombre=nombre;
    producto.descripcion=descripcion;
    producto.domicilio=domicilio;
    producto.categoriaId=categoriaId;
    producto.precioId=precioId;
    producto.tratoId=tratoId;
    producto.lat=lat;
    producto.lng=lng;
    await producto.save();
   


    return res.json({msg:'Producto actualizado',tipo:'exito'})

}

export{MiPerfil,Eliminar,EliminarProducto,EditarPublicado,EdicionProducto,FormularioEdicionProducto}