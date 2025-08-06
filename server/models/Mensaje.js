import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Mensaje=db.define('mensajes',{
    mensaje:{
        type:DataTypes.STRING,
        allowNull:false
    },
    usuarioId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'usuarios',
            key:'id'
        }
    },
    destinatarioId:{
         type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'usuarios',
            key:'id'
        }
    }

})

export default Mensaje