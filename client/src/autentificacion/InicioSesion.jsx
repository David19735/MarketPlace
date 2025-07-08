'use client'
import React, { useState,useEffect } from 'react'
import style from '@/styles/autentificacion/InicioSesion.module.css'
import Link from 'next/link';
import MensajeAlerta from '@/components/MensajeAlerta';

function InicioSesion() {

    const [view,setView]=useState(false);
    const [csrfToken,setCsrfToken]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [estadoAlerta,setEstadoAlerta]=useState(false);
    const [mensajes,setMensajes]=useState([]);
    const [tipo,setTipo]=useState('');
    
       useEffect(()=>{
          const LoadToken=async()=>{
          
             const res=await fetch('http://localhost:4000/autentificacion/inicio_sesion',{
             credentials:'include'
          })
          const data=await res.json();
          setCsrfToken(data.csrfToken)
          }
          LoadToken();
       },[])

       const handleChange=(e)=>{

         switch(e.target.name){
            case 'email': setEmail(e.target.value)
            break;

            case 'password': setPassword(e.target.value);
            break;
         }
       }

      const handleSubmit=async(e)=>{
         e.preventDefault();

         const res=await fetch('http://localhost:4000/autentificacion/inicio_sesion',{
            method:'POST',
            headers:{
               'Content-Type':'application/json',
               'X-CSRF-Token':csrfToken
            },
            body:JSON.stringify({email,password}),
            credentials:'include'
         })
         const data=await res.json();
         setEstadoAlerta(true);
         setMensajes(data.mensajes)
         setTipo(data.tipo)
      }



  return (
    <div className={style.contenedor}>
         <form action="" className='container-sm' id={style.contenedor__formulario} data-aos="zoom-in" onSubmit={handleSubmit}>
                 <h3>Market<span>Place</span></h3>
                 <h5>Iniciar Sesión</h5>
               
                 <div className={style.contenedor__input}>
                    <label htmlFor="">Correo</label>
                    <input type="email" placeholder='Email' name='email' value={email} onChange={handleChange}/>
                 </div>
                 <div className={style.contenedor__input}>
                    <label htmlFor="">Contraseña</label>
                    <input type={view ? 'text':'password'} placeholder='Password' name='password' value={password} onChange={handleChange}/>
                    {
                        view? 
                        <i className="bi bi-eye-slash-fill" onClick={()=>{setView(!view)}}></i>
                        :
                        <i className="bi bi-eye-fill" onClick={()=>{setView(!view)}}></i>
                    }
                 </div>
                  <div className={style.enlaces}>
                     <Link href={'/registro'}>¿No tienes cuenta? Regístrate</Link>
                     <Link href={'/olvide_password'}>¿Olvidaste tu contraseña?</Link>
                 </div>
                 <div className={style.contenedor__Botones}>
                      <button>Iniciar Sesión</button>
                 </div>
              </form>
              {
               estadoAlerta&&
               <MensajeAlerta
                  mensajes={mensajes}
                  estadoAlerta={estadoAlerta}
                  setEstadoAlerta={setEstadoAlerta}
                  tipo={tipo}
               />
              }
    </div>
  )
}

export default InicioSesion