import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Producto=db.define('productos',{
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
    },
    categoriaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'categorias',
            key:'id'
        }
    },
    precioId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'precios',
            key:'id'
        }
    },
    tratoId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'tratos',
            key:'id'
        }
    },
    usuarioId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'usuario',
            key:'id'
        }
    },
    imagenId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
         model:'imagenes',
         key:'id'   
        }
    }
})

export default Producto