import Categoria from './Categoria.js';
import Precio from './Precio.js';
import Trato from './Trato.js';
import Usuario from './Usuario.js';
import Imagen from './Imagen.js';
import Venta from './Venta.js';

Venta.belongsTo(Usuario,{foreignKey:'usuarioId'});
Venta.belongsTo(Trato,{foreignKey:'tratoId'});
Venta.belongsTo(Precio,{foreignKey:'precioId'});
Venta.belongsTo(Categoria,{foreignKey:'categoriaId'});
Venta.belongsTo(Imagen,{foreignKey:'imagenId'})


export{
    Categoria,
    Precio,
    Trato,
    Usuario,
    Venta,
    Imagen
}