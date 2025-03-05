import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"

type ForecastDay = {
  date: string
  icon: React.ReactNode
  temperature: string
  description: string
  humidity: string
  windSpeed: string
}

const pastForecastData: ForecastDay[] = [
  {
    date: "Jun 13",
    icon: <Sun className="h-5 w-5 text-yellow-400" />,
    temperature: "26°C",
    description: "Sunny",
    humidity: "45%",
    windSpeed: "10 km/h",
  },
  {
    date: "Jun 14",
    icon: <Cloud className="h-5 w-5 text-gray-400" />,
    temperature: "24°C",
    description: "Partly cloudy",
    humidity: "50%",
    windSpeed: "12 km/h",
  },
  {
    date: "Jun 15",
    icon: <CloudRain className="h-5 w-5 text-blue-400" />,
    temperature: "22°C",
    description: "Light rain",
    humidity: "65%",
    windSpeed: "15 km/h",
  },
  {
    date: "Jun 16",
    icon: <Wind className="h-5 w-5 text-teal-400" />,
    temperature: "23°C",
    description: "Windy",
    humidity: "55%",
    windSpeed: "20 km/h",
  },
  {
    date: "Jun 17",
    icon: <Sun className="h-5 w-5 text-yellow-400" />,
    temperature: "25°C",
    description: "Sunny",
    humidity: "48%",
    windSpeed: "8 km/h",
  },
  {
    date: "Jun 18",
    icon: <Cloud className="h-5 w-5 text-gray-400" />,
    temperature: "24°C",
    description: "Overcast",
    humidity: "52%",
    windSpeed: "11 km/h",
  },
  {
    date: "Jun 19",
    icon: <Sun className="h-5 w-5 text-yellow-400" />,
    temperature: "27°C",
    description: "Clear",
    humidity: "46%",
    windSpeed: "9 km/h",
  },
]

export function PastForecastTable() {
  return (
    <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Past 7 Days Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Weather</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Humidity</TableHead>
              <TableHead>Wind Speed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pastForecastData.map((day) => (
              <TableRow key={day.date}>
                <TableCell>{day.date}</TableCell>
                <TableCell>{day.icon}</TableCell>
                <TableCell>{day.temperature}</TableCell>
                <TableCell>{day.description}</TableCell>
                <TableCell>{day.humidity}</TableCell>
                <TableCell>{day.windSpeed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

