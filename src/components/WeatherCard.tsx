import { getWeatherDescription } from "../api/openMeteoClient";
import type { GeoResult, WeatherData } from "../api/openMeteoClient";

type Props = { place: GeoResult; weather: WeatherData };

export function WeatherCard({ place, weather }: Props) {
  const desc = getWeatherDescription(weather.weathercode);
  const windDir = getWindDirection(weather.winddirection);

  return (
    <article className="weather-card">
      <div className="weather-header">
        <div className="weather-icon">{desc.icon}</div>
        <div className="weather-location">
          <h2>{place.name}</h2>
          <p className="country">{place.country}{place.admin1 ? ` · ${place.admin1}` : ""}</p>
        </div>
      </div>

      <div className="weather-temp">
        <span className="temp-value">{Math.round(weather.temperature)}</span>
        <span className="temp-unit">°C</span>
      </div>

      <p className="weather-desc">{desc.label}</p>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div>
            <p className="detail-label">Vento</p>
            <p className="detail-value">{weather.windspeed} km/h {windDir}</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div>
            <p className="detail-label">Umidade</p>
            <p className="detail-value">{weather.humidity}%</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function getWindDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  return dirs[Math.round(deg / 45) % 8];
}