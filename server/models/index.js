import Categoria from './Categoria.js';
import Precio from './Precio.js';
import Trato from './Trato.js';
import Usuario from './Usuario.js';
import Producto from './Producto.js'
import Imagen from './Imagen.js';
import Mensaje from './Mensaje.js';

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

// Relación: Un mensaje tiene un remitente (usuario)
Usuario.hasMany(Mensaje, {
  foreignKey: 'usuarioId',
  as: 'mensajesEnviados',
});

Mensaje.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'remitente',
});

// Relación: Un mensaje tiene un destinatario (usuario)
Usuario.hasMany(Mensaje, {
  foreignKey: 'destinatarioId',
  as: 'mensajesRecibidos',
});

Mensaje.belongsTo(Usuario, {
  foreignKey: 'destinatarioId',
  as: 'destinatario',
});

  //Relación de mensajes y productos 

  // Producto.js
Producto.hasMany(Mensaje, {
  foreignKey: 'productoId',
  as: 'mensajes'
});

// Mensaje.js
Mensaje.belongsTo(Producto, {
  foreignKey: 'productoId',
  as: 'producto'
});


export{
    Categoria,
    Precio,
    Trato,
    Usuario,
    Producto,
    Imagen,
    Mensaje
}