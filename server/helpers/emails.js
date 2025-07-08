import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config({path:'.env'})


const emailRegistro=async(datos)=>{

    const transport=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })  

    const {nombre,email,token}=datos;

    await transport.sendMail({
        from:'MarketPlace',
        to:email,
        subject:'Confirmación de tu cuenta',
        text:'Confirmación de tu cuenta en la página MarketPlace',
        html:`
            <p>Hola, ${nombre}, Comprueba tu cuenta www.marketPlace.com</p>
            <p>Tu cuenta ya está lista, sólo debes confirmarla en el siguiente enlace:
            <a href="http://localhost:3000/registro/${token}">Confirmar cuenta</a>
            </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}


const emailPassword=async(datos)=>{

    const transport=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })  

    const {nombre,email,token}=datos;

    await transport.sendMail({
        from:'MarketPlace',
        to:email,
        subject:'Cambio de contraseña',
        text:'Cambio de contraseña en MarketPlace',
        html:`
            <p>Hola, ${nombre}, petición para cambio de contraseña</p>
            <p>Para realizar el cambio de cotraseña debes ingresar al siguiente enlace:
            <a href="http://localhost:3000/olvide_password/${token}">Cambiar contraseña</a>
            </p>
            <p>Si tu no realizaste esta petición, puedes ignorar el mensaje</p>
        `
    })

}


export {
    emailRegistro,
    emailPassword
}