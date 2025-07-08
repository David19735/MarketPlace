'use client'
import React,{useState,useEffect} from 'react'
import style from '@/styles/autentificacion/NewPassword.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MensajeAlerta from '@/components/MensajeAlerta';

function NewPassword({token}) {

    const [view,setView]=useState(false);
    const [correcto,setCorrecto]=useState(false);
    const [csrfToken,setCsrfToken]=useState('');
    const [password,setPassword]=useState('')
    const [password2,setPassword2]=useState('')
    const [estadoAlerta,setEstadoAlerta]=useState(false)
    const [mensajes,setMensajes]=useState([]);
    const [tipo,setTipo]=useState('');


    const router=useRouter();

    useEffect(()=>{
        const loadToken=async()=>{

            const res=await fetch(`http://localhost:4000/autentificacion/olvide_password/${token}`,{
                credentials:'include'
            })
            const data=await res.json();
            setCorrecto(data.correcto)
            setCsrfToken(data.csrfToken)
        }
        loadToken()
    },[])

    const handleChange=(e)=>{
         switch(e.target.name){
            case 'password':setPassword(e.target.value)
            break;

            case 'password2':setPassword2(e.target.value)
            break;
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
       
        if(password===''||password2===''){
            setEstadoAlerta(true);
            setMensajes(['Los campos no pueden ir vacíos','Escribe la misma contraseña en los campos'])
            setTipo('error1')
            return
        }

        const res=await fetch(`http://localhost:4000/autentificacion/olvide_password/${token}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRF-Token':csrfToken
            },
            body:JSON.stringify({password,password2}),
            credentials:'include'
        })

        const data=await res.json();
        setEstadoAlerta(true);
        setMensajes(data.mensajes);
        setTipo(data.tipo);
    }

  return (
   <div className={style.contenedor}>
         {
            correcto===true ?
            <form action="" className='container-sm' id={style.contenedor__formulario} data-aos="zoom-in" onSubmit={handleSubmit}>
                 <h3>Market<span>Place</span></h3>
                 <h5>Cambiar contraseña</h5>
               
                <div className={style.contenedor__input}>
                    <label htmlFor="">Contraseña</label>
                    <input type={view ? 'text':'password'} placeholder='Contraseña' name='password' value={password} onChange={handleChange}/>
                    {
                        view? 
                        <i className="bi bi-eye-slash-fill" onClick={()=>{setView(!view)}}></i>
                        :
                        <i className="bi bi-eye-fill" onClick={()=>{setView(!view)}}></i>
                    }
                 </div>
                 <div className={style.contenedor__input}>
                    <label htmlFor="">Contraseña</label>
                    <input type={view ? 'text':'password'} placeholder='Repite la contraseña' name='password2' value={password2} onChange={handleChange}/>
                    {
                        view? 
                        <i className="bi bi-eye-slash-fill" onClick={()=>{setView(!view)}}></i>
                        :
                        <i className="bi bi-eye-fill" onClick={()=>{setView(!view)}}></i>
                    }
                 </div>
                 <div className={style.contenedor__Botones}>
                      <button>Iniciar Sesión</button>
                 </div>
              </form>
            :
            <div className='container-sm' id={style.contenedor} data-aos="zoom-in">
                    <div className={style.correcto}>
                    <h4>Market<span>place</span></h4>
                    <h3>Enlace incorrecto</h3>
                    <p>El enlace que estás visitando no contiene los permisos para realizar el cambio de contraseña, verifica tu bandeja de entrada o genera nuevamente el cambio de contraseña</p>
                    <button
                      onClick={()=>{router.push('/olvide_password')}}
                    >Cambiar contraseña</button>
               </div> 
            </div>
         }
         
         {
            estadoAlerta&&
            <MensajeAlerta
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
                tipo={tipo}
                mensajes={mensajes}
            />
         }
    </div>
  )
}

export default NewPassword