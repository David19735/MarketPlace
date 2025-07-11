import Categoria from '../models/Categoria.js';
import Trato from '../models/Trato.js';
import Precio from '../models/Precio.js'


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

    const {nombre,categoriaId,precioId,tratoId,descripcion,domicilio,imagenes}=req.body;
    console.log(nombre,categoriaId,precioId,tratoId,descripcion,domicilio,imagenes);

    return res.json({msg:'Contectando con backend'})
}


export {
    Post,
    FormularioPost
}