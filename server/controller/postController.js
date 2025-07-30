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

   try {
    const {
      usuarioId,
      categoriaId,
      precioId,
      tratoId,
      nombre,
      descripcion,
      domicilio,
      lat,
      lng,
      publicado
    } = req.body;

    const nuevoProducto=await Producto.create({
      usuarioId,
      categoriaId,
      precioId,
      tratoId,
      nombre,
      descripcion,
      domicilio,
      lat,
      lng,
      publicado
    })

    if (req.files && req.files.length > 0) {
      const imagenes = req.files.map(file => ({
        nombre: file.filename,
        productoId: nuevoProducto.id
      }));

      await Imagen.bulkCreate(imagenes);
    }

    res.status(201).json({ msg: 'Producto creado con imágenes', producto: nuevoProducto });
   } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al crear producto' });
   }
}


export {
    Post,
    FormularioPost
}