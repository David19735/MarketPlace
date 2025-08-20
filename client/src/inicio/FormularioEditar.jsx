import React, { useEffect, useState } from 'react'
import style from '@/styles/inicio/FormularioEditar.module.css'

// ejemplo en componente
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import MensajeRespuesta from '@/components/MensajeRespuesta';
import { useRouter } from 'next/navigation';


function FormularioEditar({prod,aceptar,setAceptar,mostrarMensaje,setMostrarMensaje}) {

  const imagenes=prod.imagenes;
  const [csrfToken,setCsrfToken]=useState('');
  const [datoPublicado,setDatoPublicado]=useState()
  const [tipo,setTipo]=useState('')

  const router=useRouter();

  useEffect(()=>{
    const loadToken=async()=>{
      const res=await fetch('http://localhost:4000/mi-perfil/eliminar',{
        credentials:'include'
      })
      const data=await res.json();
      setCsrfToken(data.csrfToken)
    }
    loadToken()
  },[])



  const eliminar=async(id)=>{
      const seguro = window.confirm("¿Estás seguro de eliminar este producto?");
      if (!seguro) return; // si el usuario cancela, no hace nada

    const res=await fetch('http://localhost:4000/mi-perfil/eliminar',{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'X-CSRF-Token':csrfToken
      },
      body:JSON.stringify({id}),
      credentials:'include'
    })
    const data=await res.json();
    
    window.location.reload();
  }

  const editar=(id)=>{
    
    router.push(`/post/${id}`)
  }

  const publicado=async(id)=>{

    const res=await fetch('http://localhost:4000/mi-perfil/editar',{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
        'X-CSRF-Token':csrfToken
      },
      body:JSON.stringify({id}),
      credentials:'include'
    })
    const data=await res.json();
    setTipo(data.tipo)

    if(data.tipo==='exito'){
      window.location.reload();
    }
  }

  return (
    <>
    <div className={style.producto}>
        <div className={style.carrusel}>
          <Swiper
          className={style.contenedorCarrusel}
          spaceBetween={0}
           slidesPerView={1}
           loop={true}
           speed={1000}
           effect='flip'
           modules={[Navigation]}
           navigation={true}
           autoplay={{ delay: 1000, disableOnInteraction: false }}
          >
              {
                imagenes.map((imagen,index)=>{
                  return(
                    <SwiperSlide className={style.imagen}>
                      <img src={`http://localhost:4000/uploads/${imagen.nombre}`} alt="" />
                    </SwiperSlide>
                  )
                })
              }
          </Swiper>
        </div>
        <div className={style.inf}>
                <div className={style.informacion}>
                    <p><strong>Nombre:</strong> {prod.nombre}</p>
                    <p><strong>Descripcion:</strong> {prod.descripcion}</p>
                    <p><strong>Domicilio:</strong>{prod.domicilio}</p>
                </div>
                <div className={style.botones}>
                    <button
                    onClick={()=>eliminar(prod.id)}
                    >Eliminar</button>
                    <button
                    onClick={()=>{editar(prod.id)}}
                    >Editar</button>
                    <button onClick={()=>publicado(prod.id)} style={{
                      background: prod.publicado ? '#E33614':'#22c55e'
                    }}>{
                        prod.publicado===true ?
                        'No publicar'
                        :
                        'Publicar'
                      }</button>
                </div>
        </div>
    </div>
    </> 
  )
}

export default FormularioEditar