'use client'
import React, { useEffect, useState } from 'react'
import style from '@/styles/inicio/Header.module.css'
import Link from 'next/link'
import { useUsuario } from '@/contextos/useContext';
import { useRouter } from 'next/navigation';

function Header() {

const {usuario}=useUsuario();
const [csrfToken,setCsrfToken]=useState('');
const [menuActivo,setMenuActivo]=useState(false);
const router=useRouter();


useEffect(()=>{
  const loadToken=async()=>{
    const res=await fetch('http://localhost:4000/autentificacion/cerrar_sesion',{
      credentials:'include'
    })
    const data=await res.json();
    setCsrfToken(data.csrfToken)
  }

  loadToken()
},[])

const sesion=async()=>{

  if(!usuario){

    router.push('/inicio_sesion')
    return
  }

    const res=await fetch('http://localhost:4000/autentificacion/cerrar_sesion',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRF-Token':csrfToken
      },
      body:JSON.stringify({}),
      credentials:'include'
    })
    const data=await res.json();
    window.location.reload();
    console.log(data);
}

// window.location.reload();

  return (
    <header className={style.header}>
        <div className={style.primero}>
          <Link href={'/'}>
          <h3>Market<span>Place</span></h3>
          </Link>
        </div>
        <div className={style.segundo}>
          <div className={style.enlaces}>
            <Link href={'/registro'}>Registro</Link>
            <Link href={'/mensajes'}>Mensajes</Link>
            <Link href={'/post'}>Publicar</Link>
            <Link href={'/perfil'}>Mis propiedades</Link>
          </div>
          <div className={style.boton}>
              <button
              onClick={sesion}
              >
                {
                  usuario ?
                  'Cerrar Sesión'
                  :
                  'Iniciar Sesión'
                }
              </button>
          </div>
        </div>
        
        <div className={style.botonResponsive}
          onClick={()=>{setMenuActivo(!menuActivo)}}
        >
              <i className="bi bi-list"></i>
        </div>
        <div className={menuActivo? style.menuResponsive__active : style.menuResponsive }>
                <div className={style.enlacesResponsivos}>
                  <Link href={'/registro'}>Registro</Link>
                  <Link href={'/mensajes'}>Mensajes</Link>
                  <Link href={'/post'}>Publicar</Link>
                  <Link href={'/perfil'}>Mis propiedades</Link>
                </div>
                <div className={style.botonNavResponsive}>
                  <button onClick={sesion}>
                    {
                  usuario ?
                  'Cerrar Sesión'
                  :
                  'Iniciar Sesión'
                }
                  </button>
                </div>
        </div>
    </header>
  )
}

export default Header