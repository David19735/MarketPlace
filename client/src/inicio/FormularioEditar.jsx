import React, { useEffect, useState } from 'react'
import style from '@/styles/inicio/FormularioEditar.module.css'

// ejemplo en componente
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


function FormularioEditar({prod}) {

  const imagenes=prod.imagenes;
  const [csrfToken,setCsrfToken]=useState('');

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
    console.log(data);
  }

  const editar=()=>{

  }

  const publicado=()=>{

  }

  return (
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
                    <button>Editar</button>
                    <button>Publicado</button>
                </div>
        </div>
    </div>
  )
}

export default FormularioEditar