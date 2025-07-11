import Usuario from '../models/Usuario.js'


const identificarUsuario=async(req,res)=>{

    const usuario=req.usuario;
    
    return res.json(usuario)
}

export{
    identificarUsuario
}