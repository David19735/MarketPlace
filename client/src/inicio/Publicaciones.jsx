'use client'
import React, { useEffect, useState } from 'react'
import style from '@/styles/inicio/Publicaciones.module.css';
import Header from './Header';
import FormularioPublicaciones from '@/components/FormularioPublicaciones';




function Publicaciones() {
  
        const [imagenes,setImagenes]=useState([]);
        const [productos,setProductos]=useState([]);
        const [categorias,setCategorias]=useState('');
        const [precios,setPrecios]=useState('');
        const [tratos,setTratos]=useState('');

        //Token
         const [csrfToken,setCsrfToken]=useState('');

     useEffect(()=>{
      const loadToken=async()=>{
          const res=await fetch('http://localhost:4000/mensajes/dataMensajes',{
            credentials:'include'
          })
          const data=await res.json()
          setCsrfToken(data.csrfToken)
      }

      loadToken()
    },[])

        
   useEffect(()=>{

    const loadProducts=async()=>{
      const res=await fetch('http://localhost:4000/publicaciones/general',{
        credentials:'include'
      })
      const data=await res.json();
      setImagenes(data.imagenes)
      setProductos(data.productos)
      setCategorias(data.categorias)
      setPrecios(data.precios)
      setTratos(data.tratos)
    }

    loadProducts()
  },[])

   const productosFiltrados=productos.filter((producto)=>{
    if(producto.publicado===true){
        return producto
    }
  })


  return (

    <>
    <Header/>
    <div className={style.contenedor}>
        {
          productosFiltrados.map((producto,index)=>{
            return(
              <FormularioPublicaciones
              imagenes={imagenes}
              producto={producto}
              categorias={categorias}
              precios={precios}
              tratos={tratos}
              csrfToken={csrfToken}
              key={index}
              />
            )
          })
        }
    </div>
    </>
  )
}

export default Publicaciones