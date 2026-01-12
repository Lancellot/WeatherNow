export type GeoResult = {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
  admin1?: string;
};

export type WeatherData = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
  humidity: number;
};

export type DailyForecast = {
  date: string;
  weathercode: number;
  tempMax: number;
  tempMin: number;
  precipitation: number;
};

const WEATHER_CODES: Record<number, { label: string; icon: string }> = {
  0: { label: "Céu limpo", icon: "☀️" },
  1: { label: "Principalmente limpo", icon: "🌤️" },
  2: { label: "Parcialmente nublado", icon: "⛅" },
  3: { label: "Nublado", icon: "☁️" },
  45: { label: "Névoa", icon: "🌫️" },
  48: { label: "Névoa com geada", icon: "🌫️" },
  51: { label: "Garoa leve", icon: "🌦️" },
  53: { label: "Garoa moderada", icon: "🌦️" },
  55: { label: "Garoa forte", icon: "🌧️" },
  61: { label: "Chuva leve", icon: "🌧️" },
  63: { label: "Chuva moderada", icon: "🌧️" },
  65: { label: "Chuva forte", icon: "⛈️" },
  71: { label: "Neve leve", icon: "🌨️" },
  73: { label: "Neve moderada", icon: "❄️" },
  75: { label: "Neve forte", icon: "❄️" },
  80: { label: "Pancadas leves", icon: "🌦️" },
  81: { label: "Pancadas moderadas", icon: "⛈️" },
  82: { label: "Pancadas fortes", icon: "⛈️" },
  95: { label: "Tempestade", icon: "⛈️" },
  96: { label: "Tempestade com granizo", icon: "⛈️" },
};

export function getWeatherDescription(code: number) {
  return WEATHER_CODES[code] ?? { label: "Desconhecido", icon: "🌍" };
}

export async function fetchCoordinates(city: string): Promise<GeoResult | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=pt&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao buscar cidade (${res.status})`);
  const json = await res.json();
  return json.results?.[0] ?? null;
}

export async function fetchCurrentWeather(lat: number, lon: number): Promise<{ current: WeatherData; daily: DailyForecast[] } | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao buscar clima (${res.status})`);
  const json = await res.json();
  
  if (!json.current_weather) return null;
  
  const current: WeatherData = {
    temperature: json.current_weather.temperature,
    humidity: 50, // valor padrão, pois a API gratuita não fornece na versão atual_weather
    windspeed: json.current_weather.windspeed,
    winddirection: json.current_weather.winddirection,
    weathercode: json.current_weather.weathercode,
    time: json.current_weather.time,
  };

  const daily: DailyForecast[] = json.daily.time.map((date: string, idx: number) => ({
    date,
    weathercode: json.daily.weather_code[idx],
    tempMax: json.daily.temperature_2m_max[idx],
    tempMin: json.daily.temperature_2m_min[idx],
    precipitation: json.daily.precipitation_sum[idx],
  }));

  return { current, daily };
}

