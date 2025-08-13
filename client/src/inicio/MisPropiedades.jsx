'use client'
import React, { useEffect,useState } from 'react'
import Header from './Header';
import FormularioEditar from './FormularioEditar';
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
                return <FormularioEditar key={index} prod={prod} csrfToken={csrfToken}/>
              })
            }
        </div>
      </>
  )
}

/*

categoriaId
: 
8
createdAt
: 
"2025-07-30T02:41:54.000Z"
descripcion
: 
"Se vende teclado gamer para que puedas jugar fortnite o warzone, también es perfecto para tu día a día, o bien, si eres programador.\r\n"
domicilio
: 
"104, Calle San Andrés Toto, San Esteban, Naucalpan de Juárez, Estado de México, 53530, México"
id
: 
5
imagenes
: 
Array(3)
0
: 
{id: 4, nombre: '1caad113-d384-438c-a1ce-eb1e27da7b28.jpg'}
1
: 
{id: 5, nombre: '0599f7b4-5126-4320-b362-fee6d936d5d2.jpg'}
2
: 
{id: 6, nombre: '7a4e5ee9-2144-42f9-ba8d-e4da2dae372e.jpg'}
length
: 
3
[[Prototype]]
: 
Array(0)
lat
: 
"19.46060372636011"
lng
: 
"-99.2310483399788"
nombre
: 
"Teclado gamer"
precioId
: 
2
publicado
: 
true
tratoId
: 
3
updatedAt
: 
"2025-07-30T02:41:54.000Z"
usuarioId
: 
4
*/

export default MisPropiedades