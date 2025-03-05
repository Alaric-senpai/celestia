// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
// import "leaflet/dist/leaflet.css"
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
// import "leaflet-defaulticon-compatibility"
// import { LatLngExpression } from "leaflet"

// type MapProps = {
//   center: LatLngExpression // Ensure correct type
//   zoom: number
// }

// export default function Map({ center, zoom }: MapProps) {
//   return (
//     <MapContainer
//       center={center as LatLngExpression} // Type assertion for safety
//       zoom={zoom}
//       scrollWheelZoom={false}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={center}>
//         <Popup>
//           📍 You are here! <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   )
// }
