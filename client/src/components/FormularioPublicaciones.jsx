import React,{useState,useEffect} from 'react'
import style from '@/styles/inicio/FormularioPublicaciones.module.css';
import MensajeAlerta from '@/components/MensajeAlerta';

// ejemplo en componente
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Map from '@/components/Map';
import { useUsuario } from '@/contextos/useContext';



function FormularioPublicaciones({producto,imagenes,categorias,precios,tratos,csrfToken}) {
      const [mensajes,setMensajes]=useState([])
      const [destinatarioId,setDestinatarioId]=useState();
      const [mensaje,setMensaje]=useState('');
      const [tipo,setTipo]=useState('');
      const [estadoAlerta,setEstadoAlerta]=useState(false);

      //Usuario
      const {usuario}=useUsuario();

  const verificarUsuario=(usuarioId)=>{

      setDestinatarioId(usuarioId)

      if(usuarioId===usuario.id){
        setEstadoAlerta(true);
        setMensajes(['Estás intentando enviarte un mensaje a ti mismo','Únicamente puedes enviar mensaje a otros usuarios'])
        setTipo('error1');
        return true
      }
      else{
        return false;
      }
    }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    if(!usuario){
      setEstadoAlerta(true);
      setMensajes(['Para poder enviar un mensaje tienes que iniciar sesión','Inicia sesión o crea una cuenta'])
      setTipo('error1');
      return
    }
    if(mensaje===''){ 
      setEstadoAlerta(true);
      setMensajes(['Estás enviando un mensaje vacío','Si quieres contactar con el usuario escribe un mensaje'])
      setTipo('error1');
      return 
    }

     verificarUsuario();
    const datos={mensaje,usuarioId:usuario.id,destinatarioId}

    if(usuario.id!==destinatarioId){
      
      const res=await fetch('http://localhost:4000/mensajes/dataMensajes',{
        'method':'POST',
        headers:{
          'Content-Type':'application/json',
          'X-CSRF-Token':csrfToken
        },
        body:JSON.stringify(datos),
        credentials:'include'
      })
      const data=await res.json();
      setMensajes(data.mensajes)
      setTipo(data.tipo)
      setEstadoAlerta(true);
      if(data.tipo==='exito1'){
        setMensaje('');
      }
    }
     
  }

  return (
    <>  
              <div className={style.publicacion}>
            <div className={style.imagenes}>
                <div className={style.carruselContenedor}>
                   <Swiper
                  className={style.carrusel}
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
                      if(imagen.productoId===producto.id){
                        return(
                           <SwiperSlide className={style.contendorImg} key={index}>
                              <img src={`http://localhost:4000/uploads/${imagen.nombre}`} />
                            </SwiperSlide>
                        )
                      }
                    })
                   }
                  </Swiper>
                </div>
                <div className={style.info}>
                    <h3>{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                    <p><strong>Ubicación:</strong> {producto.domicilio}</p>
                    <p><strong>Categoria:</strong> {
                        categorias.map((categoria,index)=>{
                          if(categoria.id===producto.categoriaId){
                            return categoria.nombre
                          }
                        })
                      }</p>
                    <p><strong>Precio:</strong> {
                        precios.map((precio,index)=>{
                          if(precio.id===producto.precioId){
                            return precio.nombre
                          }
                        })
                      }</p>
                    <p><strong>Acuerdo:</strong> {
                      tratos.map((trato,index)=>{
                          if(trato.id===producto.tratoId){
                            return trato.nombre
                          }
                        })
                      }</p>
                </div>
            </div>
            <div className={style.información}>
                <div className={style.mapa}>
                  <Map
                  lat={producto.lat}
                  lng={producto.lng}
                  />
                </div>
                 <div className={style.mensaje}>
                      <form action="" onSubmit={handleSubmit}>
                        <textarea name="" id="" placeholder='Envía un mensaje al creador del post' value={mensaje} onChange={(e)=>{setMensaje(e.target.value)}}></textarea>
                      <button
                      type='submit'
                      onClick={()=>{verificarUsuario(producto.usuarioId)}}
                      >Enviar</button>
                      </form>
                </div>
            </div>
        </div>
        {
          estadoAlerta&&
          <MensajeAlerta
            estadoAlerta={estadoAlerta}
            setEstadoAlerta={setEstadoAlerta}
            mensajes={mensajes}
            tipo={tipo}
          />
        }
        
    </>
  )
}

export default FormularioPublicaciones