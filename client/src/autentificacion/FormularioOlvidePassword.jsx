'use client'
import React,{useState,useEffect} from 'react'
import style from '@/styles/autentificacion/FormularioOlvidePassword.module.css'
import Link from 'next/link'
import MensajeAlerta from '@/components/MensajeAlerta'


function FormularioOlvidePassword() {

   const [csrfToken,setCsrfToken]=useState('');
   const [email,setEmail]=useState('');
   const [estadoAlerta,setEstadoAlerta]=useState(false);
   const [mensajes,setMensajes]=useState([])
   const [tipo,setTipo]=useState('');
      
         useEffect(()=>{
            const LoadToken=async()=>{
            
               const res=await fetch('http://localhost:4000/autentificacion/olvide_password',{
               credentials:'include'
            })
            const data=await res.json();
            setCsrfToken(data.csrfToken)
            }
            LoadToken();
         },[])


     const handleSubmit=async(e)=>{
      e.preventDefault();

      if(email===''){

       setEstadoAlerta(true) 
       setMensajes(['El campo del correo no puede estar vacío','Rellena el campo email'])
       setTipo('error1');
       return 
      }

      const res=await fetch('http://localhost:4000/autentificacion/olvide_password',{
         method:'POST',
         headers:{
            'Content-Type':'application/json',
            'X-CSRF-Token':csrfToken
         },
         body:JSON.stringify({email}),
         credentials:'include'
      })
      const data=await res.json();
      setEstadoAlerta(true)
      setMensajes(data.mensajes)
      setTipo(data.tipo);
   }


  return (
    <div className={style.contenedor}>
         <form action="" className='container-sm' id={style.contenedor__formulario} data-aos="zoom-in" onSubmit={handleSubmit}>
                 <h3>Market<span>Place</span></h3>
                 <h5>Recuperar contraseña</h5>
               
                 <div className={style.contenedor__input}>
                    <label htmlFor="">Correo</label>
                    <input type="email" placeholder='Email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                 </div>
                  <div className={style.enlaces}>
                     <Link href={'/registro'}>¿No tienes cuenta? Regístrate</Link>
                     <Link href={'/inicio_sesion'}>¿Ya tienes cuenta? Inicia Sesión</Link>
                 </div>
                 <div className={style.contenedor__Botones}>
                      <button>Enviar</button>
                 </div>
              </form>
              {
               estadoAlerta&&
               <MensajeAlerta
                  estadoAlerta={estadoAlerta}
                  setEstadoAlerta={setEstadoAlerta}
                  mensajes={mensajes}
                  tipo={tipo}
               />
              }
    </div>
  )
}

export default FormularioOlvidePassword