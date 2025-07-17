'use client'
import React,{useEffect, useState} from 'react'
import style from '@/styles/inicio/Post.module.css'
import Mapa from '@/components/Mapa';
import DropzoneImagenes from '@/components/Dropzone';
import { v4 as uuidv4 } from 'uuid';
import { useUsuario } from '@/contextos/useContext';
import MensajeAlerta from '@/components/MensajeAlerta';
import Header from './Header';


function Post() {

  //Importados desde la base de datos
    const [calle,setCalle]=useState('');
    const [lat,setLat]=useState('');
    const [lng,setLng]=useState('');
    const [categorias,setCategorias]=useState([])
    const [precios,setPrecios]=useState([])
    const [tratos,setTratos]=useState([])
    const [imagenes, setImagenes] = useState([]);
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

    //Obteniendo el contexto de usuario
    const {usuario}=useUsuario();

    useEffect(()=>{
      const loadInfo=async()=>{

        const res=await fetch('http://localhost:4000/post/publicar',{
          credentials:'include'
        })
        const data=await res.json();
        setCategorias(data.categorias)
        setPrecios(data.precios)
        setTratos(data.tratos)
        setCsrfToken(data.csrfToken)
      }

      loadInfo()
    },[])


  const handleDrop = (files) => {
    setImagenes(files);
  };

  const handleChage=(e)=>{
    switch(e.target.name){
      case 'nombre':setNombre(e.target.value);
      break;

      case 'categoria':setCategoriaId(parseInt(e.target.value))
      break;

      case 'precio':setPrecioId(parseInt(e.target.value));
      break;

      case 'trato':setTratoId(parseInt(e.target.value));
      break;

      case 'descripcion':setDescripcion(e.target.value);
      break;
  
    }

  }


  const handleSubmit=async(e)=>{
    e.preventDefault();
    //Obteniendo al usuario
    const {id:usuarioId}=usuario;

  

    if(!usuario){
      setEstadoAlerta(true);
      setMensajes(['No has iniciado sesión','Por favor inicia sesión para poder publicar tu producto'])
      setTipo('exito')
      return
    }

    const formData = new FormData();
    imagenes.forEach((img, index) => {
      formData.append(`imagen${index + 1}`, img);
    });

   const dom=document.querySelector('#calle').value;
   
   const paths=imagenes.map(imagen=>imagen.path);

    const newPaths=paths.map(path=>{
      const extension=path.substring(path.lastIndexOf('.'));
      const newFileName=uuidv4()+extension;
      return `./${newFileName}`
    })

    const datosImagenes={}

    newPaths.forEach((imagen,index)=>{
      datosImagenes[`imagen${index+1}`]=imagen;
    })

    
   const datos={usuarioId,categoriaId,precioId,tratoId,nombre,descripcion,domicilio:dom,imagenes:datosImagenes}


    const res=await fetch('http://localhost:4000/post/publicar',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRF-Token':csrfToken
      },
      body:JSON.stringify(datos),
      credentials:'include'
    })
    const data=await res.json();
    console.log(data);
  }


  return (
    <>
    <Header/>
    <div className={style.contenedor}>
        <form action="" className={style.formulario} onSubmit={handleSubmit}>
            <h3>Publica tu producto</h3>
            {/* Div para inputs pequeños*/}
            <div className={style.inputs}>
              <div className={style.input}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" placeholder='Nombre del producto' name='nombre' value={nombre} onChange={handleChage}/>
              </div>
               <div className={style.input}>
                <label htmlFor="categoria">Categoria</label>
                <select name="categoria" id="" value={categoriaId} onChange={handleChage}>
                  {
                    categorias.map((categoria)=>{
                      return <option value={categoria.id} key={categoria.id}>{categoria.nombre}</option>
                    })
                  }
                </select>
              </div>
               <div className={style.input}>
                <label htmlFor="trato">Forma de trato</label>
                <select name="trato" id="" value={tratoId} onChange={handleChage}>
                  {
                    precios.map((precio)=>{
                      return <option value={precio.id} key={precio.id}>{precio.nombre}</option>
                    })
                  }
                </select>
              </div>
               <div className={style.input}>
                <label htmlFor="precio">Precio</label>
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
             <Mapa
                        calle={calle} setCalle={setCalle}
                        lat={lat} setLat={setLat}
                        lng={lng} setLng={setLng}
                    />
            </div>
            <div className={style.dropzone}>
                <DropzoneImagenes onDropComplete={handleDrop} />
            </div>
            <div className={style.button}>
              <button>
                Publicar producto
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

export default Post
//nombre,precio,categoria,descripcion,domicilio