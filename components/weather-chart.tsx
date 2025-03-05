"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type WeatherChartProps = {
  hourlyData: {
    time: Date[]
    temperature2m: Float32Array
    relativeHumidity2m: Float32Array
  }
}

export function WeatherChart({ hourlyData }: WeatherChartProps) {
  const data = hourlyData.time.map((time, index) => ({
    time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    temperature: hourlyData.temperature2m[index],
    humidity: hourlyData.relativeHumidity2m[index],
  }))

  return (
    <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">24-Hour Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none" }} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                stroke="#F59E0B"
                activeDot={{ r: 8 }}
                name="Temperature (°C)"
              />
              <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#3B82F6" name="Humidity (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

