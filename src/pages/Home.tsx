import { type FormEvent, useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { WeatherCard } from "../components/Weathercard";

export function Home() {
  const [city, setCity] = useState("");
  const { place, weather, loading, error, loadWeather } = useWeather();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) loadWeather(city.trim());
  };

  return (
    <main className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1>🌤️ WeatherNow</h1>
          <p className="tagline">Previsão do tempo em tempo real</p>
        </header>

        <form onSubmit={onSubmit} className="search-form">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Digite o nome da cidade..."
              className="search-input"
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading} className="search-btn">
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {place && weather && <WeatherCard place={place} weather={weather} />}

        {!place && !weather && !loading && !error && (
          <div className="empty-state">
            <span className="empty-icon">🌍</span>
            <p>Digite uma cidade para ver o clima atual</p>
          </div>
        )}
      </div>
    </main>
  );
}