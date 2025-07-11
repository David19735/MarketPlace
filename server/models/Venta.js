import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Venta=db.define('ventas',{
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    domicilio:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Venta