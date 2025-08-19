'use client'
import React, { useEffect,useState } from 'react'
import Header from './Header';
import FormularioEditar from './FormularioEditar';
import MensajeRespuesta from '@/components/MensajeRespuesta';
import style from '@/styles/inicio/MisPropiedades.module.css'

function MisPropiedades({id}) {

    const [productos,setProductos]=useState([]);
    const [csrfToken,setsCrfToken]=useState('');

    useEffect(()=>{
        const loadInf=async()=>{
            const res=await fetch(`http://localhost:4000/mi-perfil/propiedades/${id}`,{
                credentials:'include'
            })
            const data=await res.json();
            setProductos(data.productos)
            setsCrfToken(data.csrfToken);
        }
        loadInf();
    },[])

  return (
      <>
        <Header/>
        <div className={style.contenedor}>
            {
              productos.map((prod,index)=>{
                return <FormularioEditar key={index} 
                prod={prod}
                csrfToken={csrfToken}
                />
              })
            }
        </div>
      </>
  )
}



export default MisPropiedades