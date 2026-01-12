export type BackgroundStyle = {
  gradient: string;
  color: string;
};

export function getBackgroundByWeatherCode(code: number): BackgroundStyle {
  // Céu limpo
  if (code === 0) {
    return {
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
    };
  }

  // Principalmente limpo
  if (code === 1) {
    return {
      gradient: "linear-gradient(135deg, #667eea 0%, #a8edea 100%)",
      color: "white",
    };
  }

  // Parcialmente nublado
  if (code === 2) {
    return {
      gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      color: "white",
    };
  }

  // Nublado
  if (code === 3 || code === 45 || code === 48) {
    return {
      gradient: "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)",
      color: "white",
    };
  }

  // Garoa e chuva leve
  if (code === 51 || code === 53 || code === 61) {
    return {
      gradient: "linear-gradient(135deg, #36454f 0%, #556270 100%)",
      color: "white",
    };
  }

  // Chuva moderada a forte
  if (code === 55 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) {
    return {
      gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      color: "white",
    };
  }

  // Neve
  if (code === 71 || code === 73 || code === 75) {
    return {
      gradient: "linear-gradient(135deg, #e0e7ff 0%, #cffafe 100%)",
      color: "#1f2937",
    };
  }

  // Tempestade
  if (code === 95 || code === 96 || code === 99) {
    return {
      gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: "white",
    };
  }

  // Padrão
  return {
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
  };
}
