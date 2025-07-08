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

         return res.json({categorias,precios,tratos})
    } catch (error) {
        console.log(error);
    }

}


export {
    Post
}