// components/Mapa.jsx
'use client'

import dynamic from 'next/dynamic'

// ❗ El import es dinámico y no ejecuta código de leaflet en SSR
const EdicionMapaLeafletClient = dynamic(() => import('./EdicionMapaLeafletClient'), { ssr: false })

export default function EdicionMapa({lat,lng,domicilio}) {
  return (
    <div>
      <EdicionMapaLeafletClient
            lat={lat}
            lng={lng}
            domicilio={domicilio}
      />
    </div>
  )
}
