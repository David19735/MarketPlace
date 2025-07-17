import Categoria from './Categoria.js';
import Precio from './Precio.js';
import Trato from './Trato.js';
import Usuario from './Usuario.js';
import Imagen from './Imagen.js';
import Producto from './Producto.js';

Producto.belongsTo(Usuario,{foreignKey:'usuarioId'});
Producto.belongsTo(Trato,{foreignKey:'tratoId'});
Producto.belongsTo(Precio,{foreignKey:'precioId'});
Producto.belongsTo(Categoria,{foreignKey:'categoriaId'});
Producto.belongsTo(Imagen,{foreignKey:'imagenId'})


export{
    Categoria,
    Precio,
    Trato,
    Usuario,
    Producto,
    Imagen
}