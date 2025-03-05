import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind, Droplets, Thermometer, Sun } from "lucide-react"

type StatsCardProps = {
  temperature: number
  humidity: number
  windSpeed: number
  uvIndex: number
}

export function StatsCard({ temperature, humidity, windSpeed, uvIndex }: StatsCardProps) {
  const stats = [
    {
      title: "Temperature",
      value: `${temperature.toFixed(1)}°C`,
      icon: <Thermometer className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Humidity",
      value: `${humidity.toFixed(0)}%`,
      icon: <Droplets className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Wind Speed",
      value: `${windSpeed.toFixed(1)} m/s`,
      icon: <Wind className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "UV Index",
      value: uvIndex.toFixed(0),
      icon: <Sun className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-slate-800/40 backdrop-blur-sm border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

