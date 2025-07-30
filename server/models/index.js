import Categoria from './Categoria.js';
import Precio from './Precio.js';
import Trato from './Trato.js';
import Usuario from './Usuario.js';
import Producto from './Producto.js'
import Imagen from './Imagen.js';

Producto.belongsTo(Usuario,{foreignKey:'usuarioId'});
Producto.belongsTo(Trato,{foreignKey:'tratoId'});
Producto.belongsTo(Precio,{foreignKey:'precioId'});
Producto.belongsTo(Categoria,{foreignKey:'categoriaId'});

Producto.hasMany(Imagen, {
    foreignKey: 'productoId',
    onDelete: 'CASCADE'
});

Imagen.belongsTo(Producto, {
    foreignKey: 'productoId'
});



export{
    Categoria,
    Precio,
    Trato,
    Usuario,
    Producto,
    Imagen
}