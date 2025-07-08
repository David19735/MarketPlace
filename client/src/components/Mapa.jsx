// components/Mapa.jsx
'use client'

import dynamic from 'next/dynamic'

// ❗ El import es dinámico y no ejecuta código de leaflet en SSR
const MapaLeafletClient = dynamic(() => import('./MapaLeafletClient'), { ssr: false })

export default function Mapa() {
  return (
    <div>
      <MapaLeafletClient />
    </div>
  )
}
