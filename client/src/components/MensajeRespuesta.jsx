import React,{useState} from 'react'
import styled from 'styled-components';


function MensajeRespuesta({mostrarMensaje,setMostrarMensaje,aceptar,setAceptar}) {


  return (
    <ContenedorAlerta>
        <Mensaje>
            <Informacion>

            </Informacion>
           <Botones>    
            <Boton1>Aceptar</Boton1>
            <Boton2>Regresar</Boton2>
            </Botones> 
        </Mensaje>
    </ContenedorAlerta>
  )
}

const ContenedorAlerta=styled.div`
   width: 100%;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.65);
   position: fixed;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000000;
`;

const Mensaje=styled.div`
    width: 50%;
    height: 40vh;
    background: white;
    box-shadow: 0px 1px 11px 3px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 1px 11px 3px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 1px 11px 3px rgba(0,0,0,0.75);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    gap: 1rem;
`;

const Informacion=styled.div`
    width: 100%;
    height: 25vh;
    border: solid 1px red;
`;

const Botones=styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const Boton1=styled.button`
    width: 25%;
    height: 7vh;
    border: none;
    background: #0d0d47;
    border-radius: 5px;
    color: white;
    letter-spacing: 1px;
    font-weight: 700;
`;

const Boton2=styled.button`
    width: 25%;
    height: 7vh;
    border: none;
    background: #570c0c;
    border-radius: 5px;
    color: white;
    letter-spacing: 1px;
    font-weight: 700;
`;

export default MensajeRespuesta