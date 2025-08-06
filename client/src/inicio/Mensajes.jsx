'use client';
import React from 'react'
import style from '@/styles/inicio/Mensajes.module.css'
import Header from './Header'
import { useUsuario } from '@/contextos/useContext';


function Mensajes() {

    const {usuario}=useUsuario();
    console.log(usuario);

  return (
   <>
   <Header/>
    <div className={style.contenedor}>

    </div>
   </>
  )
}

export default Mensajes