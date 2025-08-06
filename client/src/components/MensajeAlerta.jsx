import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'

function MensajeAlerta({estadoAlerta,setEstadoAlerta,mensajes,tipo}) {


  const router=useRouter();

  const handleAlerta=()=>{

    setEstadoAlerta(false);
  }

  const handleRuta=()=>{
    if(tipo==='exito'){
      router.push('/inicio_sesion');
    }
    else if(tipo==='sesion'){
      router.push('/');
    }
  }


  return (
    <ContenedorAlerta>
      <AlertaBox>
        {
         tipo==='error' ?
          mensajes.map((mensaje,index)=>{
            return <Mensaje key={index}>{mensaje.msg}</Mensaje>
          })
         :
          mensajes.map((mensaje,index)=>{
            return <Mensaje key={index}>{mensaje}</Mensaje>
          })
        }
        <Boton onClick={()=>{
          handleAlerta()
          handleRuta()
          }}>OK</Boton>
      </AlertaBox>
    </ContenedorAlerta>
  )
}

const ContenedorAlerta=styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.65); /* Fondo oscuro */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

    const AlertaBox = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 90%;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    `;

    const Mensaje = styled.p`
    font-size: 0.9rem;
    margin-bottom: 1rem;
    `;


    const Boton = styled.button`
    background-color: #0070f3;
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #0059c1;
    }
    `;

export default MensajeAlerta