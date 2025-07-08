import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Productos=db.define('productos',{
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Productos