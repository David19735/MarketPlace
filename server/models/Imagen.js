import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Imagen = db.define('imagenes', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
    }
});

export default Imagen;
