"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import dynamic from "next/dynamic"

// const MapWithNoSSR = dynamic(() => import("@/components/map"), {
//   ssr: false,
// })

export default function MapPage() {
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 })
  const [address, setAddress] = useState("")

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      )
      const data = await response.json()
      if (data && data.length > 0) {
        setLocation({ lat: Number.parseFloat(data[0].lat), lng: Number.parseFloat(data[0].lon) })
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error)
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <FadeIn>
        <h1 className="text-3xl font-bold text-white mb-2">Map</h1>
        <p className="text-slate-300">View locations on the map</p>
      </FadeIn>
      <FadeIn>
        <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Search Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter an address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
      <FadeIn>
        <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Map View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              {/* <MapWithNoSSR center={[location.lat, location.lng]} zoom={13} /> */}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}

