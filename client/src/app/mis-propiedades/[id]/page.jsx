import React from 'react'
import MisPropiedades from '@/inicio/MisPropiedades'

async function page({params}) {

  const {id}=await params;

  return (
    <>
        <MisPropiedades
        id={id}
        />
    </>
  )
}

export default page