"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"

export default function GeocodingPage() {
  const [address, setAddress] = useState("")
  const [results, setResults] = useState<any[]>([])

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      )
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error fetching geocoding data:", error)
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <FadeIn>
        <h1 className="text-3xl font-bold text-white mb-2">Geocoding</h1>
        <p className="text-slate-300">Search for locations and get their coordinates</p>
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
            <CardTitle className="text-xl font-semibold">Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((result) => (
                  <li key={result.place_id} className="bg-slate-700/30 p-4 rounded-lg">
                    <h3 className="font-medium text-white">{result.display_name}</h3>
                    <p className="text-sm text-slate-300">Latitude: {result.lat}</p>
                    <p className="text-sm text-slate-300">Longitude: {result.lon}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-300">No results found</p>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}

