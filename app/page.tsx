'use client'
import { StatsCard } from "@/components/stats-card"
import { WeatherForecast } from "@/components/weather-forecast"
import { PastForecastTable } from "@/components/past-forecast-table"
import { WeatherChart } from "@/components/weather-chart"
import { FadeIn } from "@/components/fade-in"
import { useEffect, useState } from "react"
import { Skeleton} from '@/components/ui/skeleton'
import { fetchWeather } from "@/lib/weather"

export default function Page() {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [errorData, setErrorData] = useState<any>()


  const setDefaultLocales = () => {
    setLatitude(-1.286389)
    setLongitude(36.817223)
  }

  const initLocale = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        },
        () => {
          setDefaultLocales()
        }
      )
    } else {
      setDefaultLocales()
    }
  }

  useEffect(() => {
    initLocale()
  }, [])

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchWeather(latitude, longitude)
        .then((data) => {
          setWeatherData(data)

          setLoading(false)
        })
        .catch((error) => {
          setErrorData(error)
          setError(true)
          setLoading(false)
        })
    }
  }, [latitude, longitude])

  if (loading) {
    return (
      <>
      <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4 lg:grid-cols-4 p-6 w-full">

          <div className="border-2 border-gray-600 p-4  space-y-6 rounded-sm">
            <Skeleton className="h-7 w-full rounded-md" />
            <Skeleton className="h-7 w-5/6 rounded-md" />

          </div>
          <div className="border-2 border-gray-600 p-4 space-y-6 rounded-sm">
            <Skeleton className="h-7 w-full rounded-md" />
            <Skeleton className="h-7 w-5/6 rounded-md" />

          </div>
          <div className="border-2 border-gray-600 p-4 space-y-6 rounded-sm">
            <Skeleton className="h-7 w-full rounded-md" />
            <Skeleton className="h-7 w-5/6 rounded-md" />

          </div>
          <div className="border-2 border-gray-600 p-4 rounded-sm space-y-6">
            <Skeleton className="h-7 w-full rounded-md" />
            <Skeleton className="h-7 w-5/6 rounded-md" />

          </div>



      </div>

      <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4 lg:grid-cols-4 p-6 w-full">
                <div className="border-2 border-gray-600 p-4 w-full h-28">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="border-2 border-gray-600 p-4 w-full h-28">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="border-2 border-gray-600 p-4 w-full h-28">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="border-2 border-gray-600 p-4 w-full h-28">
                    <Skeleton className="w-full h-full" />
                </div>
          </div>

      </>
    )
  }

  if (error || !weatherData) {
    return (
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Error</h1>
        <p className="text-slate-300">{errorData.reason}</p>

      </div>
    )
  }

  const currentHourIndex = new Date().getHours()
  const currentTemperature = weatherData.hourly.temperature2m[currentHourIndex]
  const currentHumidity = weatherData.hourly.relativeHumidity2m[currentHourIndex]
  const currentWindSpeed = weatherData.hourly.windSpeed10m[currentHourIndex]

  const forecastData = weatherData.daily.time.map((date: string, index: number) => ({
    date: new Date(date),
    weatherCode: weatherData.daily.weatherCode[index],
    maxTemp: weatherData.daily.temperature2mMax[index],
    minTemp: weatherData.daily.temperature2mMin[index],
    precipitation: weatherData.daily.precipitationSum[index],
  }))

  return (
    <div className="flex-1 p-6 space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-slate-300">Current weather conditions and forecast for your location</p>
        </div>
      </FadeIn>
      <FadeIn>
        <StatsCard
          temperature={currentTemperature}
          humidity={currentHumidity}
          windSpeed={currentWindSpeed}
          uvIndex={5}
        />
      </FadeIn>
      <FadeIn>
        <WeatherForecast forecast={forecastData} />
      </FadeIn>
      <FadeIn>
        <WeatherChart hourlyData={weatherData.hourly} />
      </FadeIn>
      <FadeIn>
        <PastForecastTable  />
      </FadeIn>
    </div>
  )
}
