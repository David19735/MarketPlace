import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:'env'})


const generarId=()=>Date.now().toString(32)+Math.random().toString(32).substring(2)
const generarJwt=datos=>jwt.sign({id:datos.id,nombre:datos.nombre},process.env.JWT_SECRET,{expiresIn:'1d'})


export {
    generarId,
    generarJwt
}