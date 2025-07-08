'use client'
import React,{useEffect, useState} from 'react'
import style from '@/styles/autentificacion/Registro.module.css'
import Link from 'next/link'
import MensajeAlerta from '@/components/MensajeAlerta'

function Registro() {

   const [csrfToken,setCsrfToken]=useState('');
   const [nombre,setNombre]=useState('')
   const [apellido1,setApellido1]=useState('')
   const [apellido2,setApellido2]=useState('')
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
   const [password2,setPassword2]=useState('')
   const [estadoAlerta,setEstadoAlerta]=useState(false);
   const [mensajes,setMensajes]=useState([])
   const [tipo,setTipo]=useState('');

   const expresionEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



   useEffect(()=>{
      const LoadToken=async()=>{
      
         const res=await fetch('http://localhost:4000/autentificacion/registro',{
         credentials:'include'
      })
      const data=await res.json();
      setCsrfToken(data.csrfToken)
      }
      LoadToken();
   },[])


   const handleSubmit=async(e)=>{

      e.preventDefault();

     if(nombre===''||apellido1===''||apellido2===''||email===''||password===''||password2===''){

        setMensajes([
           'Ningún campo debe estar vacío'
         ])
         return setEstadoAlerta(true);
     }
     if(!expresionEmail.test(email)){
          setMensajes([
           'El correo electrónico está incorrecto'
         ])
         return setEstadoAlerta(true);
     }

      const datos={nombre,apellido1,apellido2,email,password,password2}


      const res=await fetch('http://localhost:4000/autentificacion/registro',{
         method:'POST',
         headers:{
            'Content-Type':'application/json',
            'X-CSRF-Token':csrfToken
         },
         body:JSON.stringify(datos),
         credentials:'include'
      })

      const data=await res.json();
      console.log(data);
      setEstadoAlerta(true)
      setMensajes(data.mensajes)
      setTipo(data.tipo)
   }

   const handleChange=(e)=>{
      switch(e.target.name){
         case 'nombre': setNombre(e.target.value)
         break;

         case 'apellido1': setApellido1(e.target.value)
         break;

         case 'apellido2': setApellido2(e.target.value)
         break;

         case 'email': setEmail(e.target.value);
         break;

         case 'password': setPassword(e.target.value);
         break;

         case 'password2':setPassword2(e.target.value);
         break;
      }

   }

  return (
    <div className={style.contenedor}>
              <form action="" className='container-sm' id={style.contenedor__formulario} data-aos="zoom-in" onSubmit={handleSubmit}>
                 <h3>Market<span>Place</span></h3>
                 <h5>Registro</h5>
                 <div className={style.contenedor__input}>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" placeholder='nombre' id='nombre' name='nombre' value={nombre} onChange={handleChange}/>
                 </div>
                 <div className={style.contenedor__input}>
                    <label htmlFor="apellido1">Primer apellido</label>
                    <input type="text" placeholder='Apellido' id='apellido1' name='apellido1' value={apellido1} onChange={handleChange}/>
                 </div>
                 <div className={style.contenedor__input}>
                    <label htmlFor="apellido2">Segundo apellido</label>
                    <input type="text" placeholder='Apellido' id='apellido2' name='apellido2' value={apellido2} onChange={handleChange}/>
                 </div>
                 <div className={style.contenedor__input}>
                    <label htmlFor="email">Correo</label>
                    <input type="email" placeholder='Email' id='email' name='email' value={email} onChange={handleChange}/>
                 </div>
                 <div className={style.contenedor__input}>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" placeholder='Password' id='password' name='password' value={password} onChange={handleChange}/>
                 </div>
                  <div className={style.contenedor__input}>
                    <label htmlFor="password2">Repetir contraseña</label>
                    <input type="password" placeholder='Password' id='password2' name='password2' value={password2} onChange={handleChange}/>
                 </div>
                 <div className={style.enlaces}>
                     <Link href={'/inicio_sesion'}>¿Ya tienes cuenta? inicia sesión</Link>
                     <Link href={'/olvide_password'}>¿Olvidaste tu contraseña?</Link>
                 </div>
                 <div className={style.contenedor__Botones}>
                      <button>Registrarse</button>
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

export default Registro