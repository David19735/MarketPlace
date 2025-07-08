import React from 'react'
import NewPassword from '@/autentificacion/NewPassword';

async function page({params}) {

    const {token}=await params;
    

  return (
    <NewPassword
        token={token}
    />
  )
}

export default page