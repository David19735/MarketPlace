import React from 'react'
import ConfirmarCuenta from '@/autentificacion/ConfirmarCuenta'

async function page({params}) {

    const {token}=await params;

  return (
    <ConfirmarCuenta
    token={token}
    />
  )
}

export default page