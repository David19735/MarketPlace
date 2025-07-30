import * as modelos from '../models/index.js';
import categorias from './categorias.js';
import precios from './precios.js';
import tratos from './tratos.js';
import db from '../config/db.js';
import {exit} from 'node:process'
import sequelize from '../config/db.js';

const {Categoria,Precio,Trato} =modelos;


const importarDatos=async()=>{
    try {
        //Autenticar la base de datos
        await db.authenticate();
        //Generar las columnas
        await db.sync();

        //Insertamos los datos
        await Categoria.bulkCreate(categorias);
        await Precio.bulkCreate(precios);
        await Trato.bulkCreate(tratos);
        console.log("Datos importados correctamente");
        exit(0);

    } catch (error) {
        console.log(error);
        exit(1);    
    }
}   

const eliminarDatos=async()=>{
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        await Categoria.destroy({where:{},truncate:true})
        await Precio.destroy({where:{},truncate:true})
        await Trato.destroy({where:{},truncate:true})

        console.log("Eliminando datos correctamente");
        exit(0);

    } catch (error) {
        console.log(error);
        exit(1)
    }
}

if(process.argv[2]==="-i"){
    
    importarDatos();
}

if(process.argv[2]==='-e'){

    eliminarDatos();
}