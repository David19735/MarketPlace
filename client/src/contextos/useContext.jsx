'use client'
import React,{useState,useEffect,useContext,createContext} from 'react';

//Creamos el contexto
const UserContext=createContext();

export const UserProvider=({children})=>{

    const [usuario,setUsuario]=useState(null);

    useEffect(()=>{
        const getUser=async()=>{
            try {
                const res=await fetch('http://localhost:4000/inicio/identificar',{
                    credentials:'include'
                })
                const data=await res.json()
                setUsuario(data)
            } catch (error) {
                setUsuario(null)
            }
        }

        getUser();
    },[])

    return(
        <UserContext.Provider value={{usuario}}>
            {children}
        </UserContext.Provider>
    )

}

//Hook personalizado para acceder al contexto
export const useUsuario=()=>{
    const context=useContext(UserContext);
    if(!context){
        throw new Error('useUsuario debe usarse dentro de <UserProvider>')
    }
    return context
}