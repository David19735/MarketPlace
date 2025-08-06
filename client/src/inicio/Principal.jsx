import React from 'react'
import style from '@/styles/inicio/Principal.module.css'
import Carrusel from '@/components/Carrusel'
import Link from 'next/link'

function Principal() {
  return (
    <> 
    <div className={style.cards} data-aos="fade-up"
     data-aos-duration="3000">
        <div className={style.card}>
            <div className={style.imagen}>
                <img src="/principales/casa.jpg" alt="" />
            </div>
            <h4>Bienes Raíces</h4>
            <p>Encuentra las mejores ofertas de departamentos y casas en venta o renta</p>
            <button>Ver Más</button>
        </div>
        <div className={style.card}>
            <div className={style.imagen}>
                <img src="/principales/xbox.jpg" alt="" />
            </div>
            <h4>Electrónica</h4>
            <p>Los mejores celulares, teclados, periféricos y más sobre tecnología que puedas encontrar</p>
            <button>Ver Más</button>
        </div>
        <div className={style.card}>
            <div className={style.imagen}>
                <img src="/principales/tenis.jpg" alt="" />
            </div>
            <h4>Calzado y vestimenta</h4>
            <p>Ropa de marcas reconocidas, seminueva o con etiqueta, con precios mejores a los de tienda</p>
            <button>Ver Más</button>
        </div>
        <div className={style.card}>
            <div className={style.imagen}>
                <img src="/principales/consolas.jpg" alt="" />
            </div>  
            <h4>Todos los productos</h4>
            <p>Encuentra en este apartado cualquier producto que sea de tu importancia sin filtro algúno</p>
            <button><Link href={'/publicaciones'}>Ver Más</Link></button>
        </div>
    </div>

    <div className={style.informativo}>
        <div className={style.informativo__informacion} data-aos="fade-right">
            <h4>Compra o publica tus productos</h4>
            <h5>Sigue estos pasos para poder publicar tus productos:</h5>
            <ul>
                <li>Crea tu perfil <Link href={'/registro'}>aquí</Link></li>
                <li>Inicia sesión <Link href={'/inicio_sesion'}>aquí</Link></li>
                <li>Ingresa en el apartado de <Link href={'/post'}>crear post</Link></li>
                <li>Agrega un título y descripción</li>
                <li>Ingresa el domicilio donde se entrega el producto o dondé está el producto</li>
                <li>Agrega al menos 3 imágenes de lo que deseas vender</li>
                <li>Espera a que te comenten la publicación o te envíen un mensaje por privado</li>
            </ul>
        </div>
        <div className={style.informativo__imagen} data-aos="fade-left">
            <img src="/principales/unboxing.jpg" alt="" />
        </div>
    </div>
    </>
  )
}

export default Principal