// components/Mapa.jsx
'use client'

import dynamic from 'next/dynamic'

// ❗ El import es dinámico y no ejecuta código de leaflet en SSR
const StaticMap = dynamic(() => import('./StaticMap'), { ssr: false })

export default function Map({lat,lng}) {


  return (
    <div>
      <StaticMap 
      lat={lat}
      lng={lng}
      />
    </div>
  )
}
