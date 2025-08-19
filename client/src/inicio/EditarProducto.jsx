'use client'
import React, { useEffect,useState } from 'react'
import style from '@/styles/inicio/EditarProducto.module.css';
import Header from './Header';
import EdicionMapa from '@/edicion/EdicionMapa';

//
import { set } from 'date-fns';

function EditarProducto({id}) {

        const [calle,setCalle]=useState('');
        const [lat,setLat]=useState('');
        const [lng,setLng]=useState('');
        const [categorias,setCategorias]=useState([])
        const [precios,setPrecios]=useState([])
        const [tratos,setTratos]=useState([])
        const [csrfToken,setCsrfToken]=useState('');
        
      //Datos a enviar al backend
    
      const [nombre,setNombre]=useState('');
      const [categoriaId,setCategoriaId]=useState('');
      const [precioId,setPrecioId]=useState('');
      const [tratoId,setTratoId]=useState('');
      const [descripcion,setDescripcion]=useState('');
      const [domicilio,setDomicilio]=useState('');

      //Mensaje Alerta
      const [mensajes,setMensajes]=useState([]);
      const [tipo,setTipo]=useState('');
      const [estadoAlerta,setEstadoAlerta]=useState(false);

    useEffect(()=>{
        const loadInf=async()=>{
            const res=await fetch(`http://localhost:4000/mi-perfil/edicion/${id}`,{
                credentials:'include'
            })
            const data=await res.json();
            setCategorias(data.categorias)
            setTratos(data.tratos)
            setPrecios(data.precios);
            setNombre(data.producto.nombre)
            setDescripcion(data.producto.descripcion)
            setPrecioId(data.producto.precioId)
            setCategoriaId(data.producto.categoriaId)
            setTratoId(data.producto.tratoId)
            setDomicilio(data.producto.domicilio);
            setLat(data.producto.lat);
            setLng(data.producto.lng);
            console.log(data);
        }
        loadInf();
    },[])


    const handleSubmit=(e)=>{
      e.preventDefault();

      if(precioId===''||tratoId===''||descripcion===''||domicilio===''||lat===''||lng===''){
        return
      }

      const calleInput=document.getElementById('calle')?.value;
      const latInput=document.getElementById('lat')?.value;
      const lngInput=document.getElementById('lng')?.value;

      const datos={nombre,categoriaId,precioId,tratoId,descripcion,calleInput,latInput,lngInput}
      console.log(datos);
    }


    const handleChage=(e)=>{
        switch(e.target.name){
        case 'precio':setPrecioId(e.target.name);
        break;

        case 'trato':setTratoId(e.target.name);
        break;

        case 'descripcion':setDescripcion(e.target.name);
        break;
      }

    }

  return (
    <>
    <Header/>
     <div className={style.contenedor}>
        <form action="" className={style.formulario} onSubmit={handleSubmit}>
            <h3>Edita tu producto</h3>
            {/* Div para inputs pequeños*/}
            <div className={style.inputs}>
              <div className={style.input}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" placeholder='Nombre del producto' name='nombre' value={nombre} onChange={handleChage} readOnly/>
              </div>
               <div className={style.input}>
                <label htmlFor="categoria">Categoria</label>
                <select name="categoria" id="" value={categoriaId} onChange={handleChage} disabled>
                  {
                    categorias.map((categoria)=>{
                      return <option value={categoria.id} key={categoria.id}>{categoria.nombre}</option>
                    })
                  }
                </select>
              </div>
               <div className={style.input}>
                <label htmlFor="trato">Precio</label>
                <select name="trato" id="" value={tratoId} onChange={handleChage}>
                  {
                    precios.map((precio)=>{
                      return <option value={precio.id} key={precio.id}>{precio.nombre}</option>
                    })
                  }
                </select>
              </div>
               <div className={style.input}>
                <label htmlFor="precio">Trato</label>
                <select name="precio" id="" value={precioId} onChange={handleChage}>
                  {
                    tratos.map((trato)=>{
                      return <option value={trato.id} key={trato.id}>{trato.nombre}</option>
                    })
                  }
                </select>
              </div>    
            </div>
            {/* Div para inputs pequeños*/}
            <div className={style.input_grande}>
              <label htmlFor="">Descripción</label>
                <textarea name="descripcion" id="" placeholder='Escribe una descripción de mínimo 20 palabras de tu producto' value={descripcion} onChange={handleChage}/>
            </div>

            <div className={style.mapa}>
                  <EdicionMapa
                    lat={lat}
                    lng={lng}
                    domicilio={domicilio}
                  />
            </div>
            <div className={style.button}>
              <button>
                Editar producto
              </button>
            </div>
        </form>
          {
            estadoAlerta&&
            <MensajeAlerta
              mensajes={mensajes}
              tipo={tipo}
              estadoAlerta={estadoAlerta}
              setEstadoAlerta={setEstadoAlerta}
            />
          }
    </div>
    </>
  )
}

export default EditarProducto