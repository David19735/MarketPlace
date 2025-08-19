import React from 'react'
import EditarProducto from '@/inicio/EditarProducto'

async function page({params}) {
    const {id}=await params;

  return (
    <>
    <EditarProducto
    id={id}
    />
    </>
  )
}

export default page