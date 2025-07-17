import Categoria from '../models/Categoria.js';
import Trato from '../models/Trato.js';
import Precio from '../models/Precio.js'
import Imagen from '../models/Imagen.js'
import Producto from '../models/Producto.js';
import { Op } from 'sequelize';



const Post=async(req,res)=>{
    try {
        const [categorias,precios,tratos]=await Promise.all([
            Categoria.findAll(),
            Trato.findAll(),
            Precio.findAll()
        ])  

         return res.json({categorias,precios,tratos,csrfToken:req.csrfToken()})
    } catch (error) {
        console.log(error);
    }

}

const FormularioPost=async(req,res)=>{

    const {usuarioId,nombre,categoriaId,precioId,tratoId,descripcion,domicilio,imagenes}=req.body;
    const {imagen1,imagen2,imagen3}=imagenes;

    console.log(usuarioId,nombre,categoriaId,precioId,tratoId,descripcion,domicilio,imagenes);

        await Imagen.create({
        imagen1,
        imagen2,
        imagen3
    })

    const imagenuuid=imagen1.substring(imagen1.indexOf('./'));
    const filaImagen=await Imagen.findOne({
        where:{
            imagen1:{
                [Op.like]:imagenuuid
            }
        }
    })

    const {id:imagenId}=filaImagen;

    const producto=await Producto.create({
        nombre,
        descripcion,
        domicilio,
        categoriaId,
        precioId,
        tratoId,
        usuarioId,
        imagenId:parseInt(imagenId)
    })


    return res.json({msg:'Contectando con backend'})
}


export {
    Post,
    FormularioPost
}