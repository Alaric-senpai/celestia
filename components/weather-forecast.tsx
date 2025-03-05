import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"
import { getWeatherDescription } from "@/lib/weather"

type ForecastDay = {
  date: Date
  weatherCode: number
  maxTemp: number
  minTemp: number
  precipitation: number
}

type WeatherForecastProps = {
  forecast: ForecastDay[]
}

function getWeatherIcon(code: number) {
  if (code <= 3) return <Sun className="h-6 w-6 text-yellow-400" />
  if (code <= 48) return <Cloud className="h-6 w-6 text-gray-400" />
  if (code <= 67) return <CloudRain className="h-6 w-6 text-blue-400" />
  return <Wind className="h-6 w-6 text-teal-400" />
}

export function WeatherForecast({ forecast }: WeatherForecastProps) {
  if (!forecast || forecast.length === 0) {
    return <div>No forecast data available</div>
  }

  const today = new Date();

  // Filter past data (before today)
  const pastData = forecast.filter((day) => new Date(day.date) < today);

  // Filter future data (after today)
  const future = forecast.filter((day) => new Date(day.date) >= today);

  return (
    <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {future.map((day) => (
            <div key={day.date.toISOString()} className="flex flex-col items-center p-4 rounded-lg bg-slate-700/30">
              <h3 className="font-medium text-white">{day.date.toLocaleDateString("en-US", { weekday: "short" })}</h3>
              <p className="text-sm text-slate-300">
                {day.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
              <div className="my-2">{getWeatherIcon(day.weatherCode)}</div>
              <p className="text-2xl font-bold text-white">{day.maxTemp?.toFixed(1) ?? "N/A"}°C</p>
              <p className="text-sm text-slate-300">{day.minTemp?.toFixed(1) ?? "N/A"}°C</p>
              <p className="text-sm text-slate-300">{getWeatherDescription(day.weatherCode)}</p>
              <p className="text-sm text-slate-300">Precip: {day.precipitation?.toFixed(1) ?? "N/A"}mm</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

