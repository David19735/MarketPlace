// components/MapaLeafletClient.jsx
'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function StaticMap({lat,lng}) {
  const [position, setPosition] = useState([lat, lng])
  const [address, setAddress] = useState("Ingresa el punto de entrega o dirección a acudir")


  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/layers-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    })
  }, [])

  const getAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      const data = await response.json()
      setAddress(data.display_name || "Dirección no encontrada")
    } catch (error) {
      console.error("Error al obtener dirección:", error)
      setAddress("Error al obtener la dirección")
    }
  }

  const handleDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng()
    setPosition([lat, lng])
    getAddress(lat, lng)
  }

  return (
    <>
      <div style={{ height: "60vh", width: "100%" }}>
        <MapContainer center={position} zoom={12} style={{ height: "60vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={position} draggable eventHandlers={{ dragend: handleDragEnd }}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}
