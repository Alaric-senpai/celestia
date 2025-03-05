
import { fetchWeatherApi } from 'openmeteo'

export async function  fetchWeather(latitude:number, longitude:number){
     const params = {
    latitude,
    longitude,
    hourly: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m"],
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_sum"],
    timezone: "auto",
    past_days: 7,
    forecast_days: 7,
  }

  const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params)
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

  const response = responses[0]

  const utcOffsetSeconds = response.utcOffsetSeconds()
  const hourly = response.hourly()!
  const daily = response.daily()!

  const weatherData = {
    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000),
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
      windSpeed10m: hourly.variables(2)!.valuesArray()!,
    },
    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000),
      ),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
      precipitationSum: daily.variables(3)!.valuesArray()!,
    },
  }

  return weatherData  
}

export function getWeatherDescription(code: number): string {
    const weatherCodes: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    }
    return weatherCodes[code] || "Unknown"
  }
  