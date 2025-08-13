'use client';
import React, { useEffect, useState } from 'react'
import style from '@/styles/inicio/Mensajes.module.css'
import Header from './Header'
import { useUsuario } from '@/contextos/useContext';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';
import {es} from 'date-fns/locale'


function Mensajes() {

    const {usuario}=useUsuario();
    const id=usuario?.id;
    const [mensajes,setMensajes]=useState([]);
    const [imagenes,setImagenes]=useState([])

    useEffect(()=>{
      if(!id) return;

      const loadInfo=async()=>{
        const res=await fetch(`http://localhost:4000/mensajes/data/${id}`,{
          credentials:'include'
        })
        const data=await res.json();
        setMensajes(data.mensajes);
        setImagenes(data.imagenes)
      }
      loadInfo()
    },[id])

    const primeraImagen=(productoId)=>{

      const imgs=imagenes.filter((imagen)=>{
        if(imagen.productoId===productoId){
          return imagen
        }
      })

        return `http://localhost:4000/uploads/${imgs[0].nombre}`
    }


  return (
   <>
    <Header/>
    <div className={style.contenedor}>
          {
            mensajes.map((mensaje,index)=>{
              return(
                <div className={style.contenedorMensaje} key={index}>
                  <div className={style.parte1}>
                  <h3>De: <strong>{mensaje.remitente.nombre}</strong></h3>
                  <h3>Email: <strong>{mensaje.remitente.email}</strong></h3>
                 <p>{mensaje.mensaje}</p>
                  </div>
                  <div className={style.parte2}>
                  <h4>Enviado: <strong>{format(parseISO(mensaje.updatedAt),"dd 'de' MMMM 'del' yyyy pp",{locale:es})}</strong></h4>
                   <div className={style.imagen}>
                        <img src={primeraImagen(mensaje.producto.id)}/>
                    </div>  
                  <p>{mensaje.producto.nombre}</p>
                  </div>
                </div>
              )
            })
          }
    </div>
   </>
  )
}

/*

<div className={style.imagen}>
                    
                  </div>
   
            <div className={style.contenedorMensajes} key={index}>
              <div className={style.parte1}>
                <h3>De: <strong>{mensaje.remitente.nombre}</strong></h3>
                <h3>Email: <strong>{mensaje.remitente.email}</strong></h3>
                <p>{mensaje.mensaje}</p>
              </div>
              <div className={style.parte1}>
                  <h4>Enviado: <strong>{format(parseISO(mensaje.updatedAt),"dd 'de' MMMM 'del' yyyy pp",{locale:es})}</strong></h4>
              </div>
              
            </div>

            {
          mensajes.map((mensaje,index)=>{
            return (
                
            )
          })
        }
*/

export default Mensajes