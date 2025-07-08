import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Imagen=db.define('imagenes',{
    imagen1:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imagen2:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imagen3:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


export default Imagen