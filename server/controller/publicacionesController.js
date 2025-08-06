import Producto from '../models/Producto.js'
import Imagen from '../models/Imagen.js';
import Categoria from '../models/Categoria.js';
import Precio from '../models/Precio.js';
import Trato from '../models/Trato.js'


const Prueba=async(req,res)=>{

    const productos=await Producto.findAll();
    const imagenes=await Imagen.findAll();
    const categorias=await Categoria.findAll();
    const precios=await Precio.findAll();
    const tratos=await Trato.findAll();

    return res.json({productos,imagenes,categorias,precios,tratos})
}


export {Prueba}