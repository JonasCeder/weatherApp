export class WeatherSymbol {
  id: number;
  symbol: string;
  description: string;

  constructor(id: number, symbol: string, description: string) {
    this.id = id;
    this.symbol = symbol;
    this.description = description;
  }
}

const weatherSymbols = [
  new WeatherSymbol(1, "", "clear sky"),
  new WeatherSymbol(2, "partly-cloudy-day", "nearly clear sky"),
  new WeatherSymbol(3, "partly-cloudy-day", "variable cloudiness"),
  new WeatherSymbol(4, "cloudy", "halfclear sky"),
  new WeatherSymbol(5, "cloudy", "cloudy sky"),
  new WeatherSymbol(6, "cloudy", "overcast"),
  new WeatherSymbol(7, "fog", "fog"),
  new WeatherSymbol(8, "cloudy-night", "light rain showers"),
  new WeatherSymbol(9, "cloudy-night", "moderate rain showers"),
  new WeatherSymbol(10, "cloudy-night", "heavy rain showers"),
  new WeatherSymbol(11, "cloudy-night", "thunderstorm"),
  new WeatherSymbol(12, "cloudy-night", "light sleet showers"),
  new WeatherSymbol(13, "cloudy-night", "moderate sleet showers"),
  new WeatherSymbol(14, "cloudy-night", "heavy sleet showers"),
  new WeatherSymbol(15, "cloudy-night", "light snow showers"),
  new WeatherSymbol(16, "cloudy-night", "moderate snow showers"),
  new WeatherSymbol(17, "cloudy-night", "heavy snow showers"),
  new WeatherSymbol(18, "rain", "light rain"),
  new WeatherSymbol(19, "rain", "moderate rain"),
  new WeatherSymbol(20, "rain", "heavy rain"),
  new WeatherSymbol(21, "thunderstorm", "thunder"),
  new WeatherSymbol(22, "sleet", "light sleet"),
  new WeatherSymbol(23, "sleet", "moderate sleet"),
  new WeatherSymbol(24, "sleet", "heavy sleet"),
  new WeatherSymbol(25, "snow", "light snow"),
  new WeatherSymbol(26, "snow", "moderate snow"),
  new WeatherSymbol(27, "snow", "heavy snow"),
]

export function getWeatherSymbolById(id: number): WeatherSymbol | undefined {
  return weatherSymbols.find(symbol => symbol.id === id);
}
