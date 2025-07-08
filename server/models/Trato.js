import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Trato=db.define('tratos',{
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Trato;