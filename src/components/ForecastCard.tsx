import type { DailyForecast } from "../api/openMeteoClient";
import { getWeatherDescription } from "../api/openMeteoClient";

type Props = { forecast: DailyForecast[] };

export function ForecastCard({ forecast }: Props) {
  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);
  const todayString = todayObj.toISOString().split("T")[0];

  const upcomingDays = forecast
    .filter((day: DailyForecast) => {
      const dayDate = new Date(day.date + "T00:00:00");
      dayDate.setHours(0, 0, 0, 0);
      return dayDate >= todayObj;
    })
    .slice(0, 7);

  return (
    <section className="forecast-section">
      <h3>Previsão 7 Dias</h3>
      <div className="forecast-grid">
        {upcomingDays.map((day: DailyForecast, idx: number) => {
          const desc = getWeatherDescription(day.weathercode);
          const date = new Date(day.date + "T00:00:00");
          date.setHours(0, 0, 0, 0);
          const dayName = date
            .toLocaleDateString("pt-BR", { weekday: "short" })
            .replace(".", "");
          const dayNum = date.getDate();
          const isToday = day.date === todayString;

          return (
            <div key={idx} className={`forecast-item ${isToday ? "today" : ""}`}>
              <p className="forecast-day">{isToday ? "HOJE" : dayName}</p>
              <p className="forecast-date">{dayNum}</p>
              <span className="forecast-icon">{desc.icon}</span>
              <div className="forecast-temps">
                <p className="forecast-max">{Math.round(day.tempMax)}°</p>
                <p className="forecast-min">{Math.round(day.tempMin)}°</p>
              </div>
              {day.precipitation > 0 && (
                <p className="forecast-rain">💧 {day.precipitation}mm</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
