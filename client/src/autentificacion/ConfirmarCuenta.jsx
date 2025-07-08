'use client'
import React, { useEffect, useState } from 'react'
import style from '../styles/autentificacion/ConfirmarCuenta.module.css';
import { useRouter } from 'next/navigation';

function ConfirmarCuenta({token}) {

    const [estado,setEstado]=useState(true);
    const [csrfToken,setCsrfToken]=useState('');
    const router=useRouter()


    useEffect(()=>{
      const loadUser=async()=>{
        const res=await fetch(`http://localhost:4000/autentificacion/registro/${token}`,{
          credentials:'include'
        })
        const data=await res.json();
        setCsrfToken(data.csrfToken)
        setEstado(data.confirmar)
      }
      loadUser()
    },[])

    
    return (
    <div className={style.container}>
      <div className='container-sm' id={style.contenedor} data-aos="zoom-in">
            {
                estado===true ?
               <div className={style.correcto}>
                    <h4>Market<span>place</span></h4>
                    <h3>Cuenta confirmada con éxito</h3>
                    <p>Has confirmado tu cuenta con éxito, ahora puedes iniciar sesión con tu correo y contraseña y así poder interactuar con otros usuarios</p>
                    <button
                      onClick={()=>{router.push('/inicio_sesion')}}
                    >Iniciar Sesión</button>
               </div> 
                :
                <div className={style.correcto}>
                    <h4>Market<span>place</span></h4>
                    <h3>Error al confirmar cuenta</h3>
                    <p>El link al que has ingresado es incorrecto por lo que no podemos confirmar tu cuenta, ingresa a tu correo electrónico o en el que caso de ser necesario, realiza el registro nuevamente</p>
                    <button
                    onClick={()=>{router.push('/registro')}}
                    >Registrarse</button>
                </div> 
            }
      </div>        
    </div>
  )
}

export default ConfirmarCuenta