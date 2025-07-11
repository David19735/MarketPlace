import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:'.env'})
import Usuario from '../models/Usuario.js'

const protegerRuta=async(req,res,next)=>{

    const {token}=req.cookies;

    //En caso de que no existe el token
    if(!token){
        
         req.usuario=null;
        return next();
    }

    //Si existe el token realizaremos validaciones

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const {id}=decoded;
        const usuario=await Usuario.scope('eliminarPassword').findByPk(id);
        req.usuario=usuario;
        return next();

    } catch (error) {
        req.usuario=null;
        res.clearCookie('token');
        return next();
    }

}


export default protegerRuta;