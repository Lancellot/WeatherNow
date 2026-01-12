import { useState, useCallback } from "react";
import { fetchCoordinates, fetchCurrentWeather, type WeatherData, type DailyForecast, type GeoResult } from "../api/openMeteoClient";

type WeatherState = {
  place: GeoResult | null;
  weather: WeatherData | null;
  forecast: DailyForecast[] | null;
  loading: boolean;
  error: string | null;
};

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    place: null,
    weather: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const loadWeather = useCallback(async (city: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const place = await fetchCoordinates(city);
      if (!place) {
        throw new Error("Cidade não encontrada. Verifique o nome e tente novamente.");
      }
      const data = await fetchCurrentWeather(place.latitude, place.longitude);
      if (!data) {
        throw new Error("Não foi possível obter dados meteorológicos.");
      }
      setState({ place, weather: data.current, forecast: data.daily, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado ao buscar clima.";
      setState({ place: null, weather: null, forecast: null, loading: false, error: message });
    }
  }, []);

  return { ...state, loadWeather };
}