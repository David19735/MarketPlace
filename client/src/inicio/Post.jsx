'use client'
import React,{useEffect, useState} from 'react'
import style from '@/styles/inicio/Post.module.css'
import Mapa from '@/components/Mapa';
import DropzoneImagenes from '@/components/Dropzone';

function Post() {

    const [calle,setCalle]=useState('');
    const [lat,setLat]=useState('');
    const [lng,setLng]=useState('');
    const [categorias,setCategorias]=useState([])
    const [precios,setPrecios]=useState([])
    const [tratos,setTratos]=useState([])
    const [imagenes, setImagenes] = useState([]);

    useEffect(()=>{
      const loadInfo=async()=>{

        const res=await fetch('http://localhost:4000/post/publicar',{
          credentials:'include'
        })
        const data=await res.json();
        setCategorias(data.categorias)
        setPrecios(data.precios)
        setTratos(data.tratos)
      }

      loadInfo()
    },[])


  const handleDrop = (files) => {
    setImagenes(files);
  };


  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData = new FormData();
    imagenes.forEach((img, index) => {
      formData.append(`imagen${index + 1}`, img);
    });


  }


  return (
    <div className={style.contenedor}>
        <form action="" className={style.formulario} onSubmit={handleSubmit}>
            <h3>Publica tu producto</h3>
            {/* Div para inputs pequeños*/}
            <div className={style.inputs}>
              <div className={style.input}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" placeholder='Nombre del producto'/>
              </div>
               <div className={style.input}>
                <label htmlFor="categoria">Categoria</label>
                <select name="" id="">
                  {
                    categorias.map((categoria)=>{
                      return <option value={categoria.nombre} key={categoria.id}>{categoria.nombre}</option>
                    })
                  }
                </select>
              </div>
               <div className={style.input}>
                <label htmlFor="precios">Precio</label>
                <select name="" id="">
                  {
                    precios.map((precio)=>{
                      return <option value={precio.nombre} key={precio.id}>{precio.nombre}</option>
                    })
                  }
                </select>
              </div>
               <div className={style.input}>
                <label htmlFor="tratos">Forma de trato</label>
                <select name="" id="">
                  {
                    tratos.map((trato)=>{
                      return <option value={trato.nombre} key={trato.id}>{trato.nombre}</option>
                    })
                  }
                </select>
              </div>    
            </div>
            {/* Div para inputs pequeños*/}
            <div className={style.input_grande}>
              <label htmlFor="">Descripción</label>
                <textarea name="" id="" placeholder='Escribe una descripción de mínimo 20 palabras de tu producto'></textarea>
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
    </div>
  )
}

export default Post
//nombre,precio,categoria,descripcion,domicilio