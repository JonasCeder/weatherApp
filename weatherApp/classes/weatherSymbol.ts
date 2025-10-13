export class WeatherSymbol {
  id: number;
  symbolCode: string;
  description: string;

  constructor(id: number, symbolCode: string, description: string) {
    this.id = id;
    this.symbolCode = symbolCode;
    this.description = description;
  }
}

// NOTE: Add some more fine tuned logic to show nigth or clody symbols
const weatherSymbols = [
  new WeatherSymbol(1, "clearsky", "clear sky"),
  new WeatherSymbol(2, "fair", "nearly clear sky"),
  new WeatherSymbol(3, "fair", "variable cloudiness"),
  new WeatherSymbol(4, "partlycloudy", "halfclear sky"),
  new WeatherSymbol(5, "cloudy", "cloudy sky"),
  new WeatherSymbol(6, "cloudy", "overcast"),
  new WeatherSymbol(7, "fog", "fog"),
  new WeatherSymbol(8, "lightrain", "light rain showers"),
  new WeatherSymbol(9, "rain", "moderate rain showers"),
  new WeatherSymbol(10, "heavyrain", "heavy rain showers"),
  new WeatherSymbol(11, "heavyrainshowersandthunder", "thunderstorm"),
  new WeatherSymbol(12, "lightsleet", "light sleet showers"),
  new WeatherSymbol(13, "sleet", "moderate sleet showers"),
  new WeatherSymbol(14, "heavysleet", "heavy sleet showers"),
  new WeatherSymbol(15, "lightsnow", "light snow showers"),
  new WeatherSymbol(16, "snow", "moderate snow showers"),
  new WeatherSymbol(17, "heavysnow", "heavy snow showers"),
  new WeatherSymbol(18, "lightrain", "light rain"),
  new WeatherSymbol(19, "rain", "moderate rain"),
  new WeatherSymbol(20, "heavyrain", "heavy rain"),
  new WeatherSymbol(21, "rainandthunder", "thunder"),
  new WeatherSymbol(22, "lightsleet", "light sleet"),
  new WeatherSymbol(23, "sleet", "moderate sleet"),
  new WeatherSymbol(24, "heavysleet", "heavy sleet"),
  new WeatherSymbol(25, "lightsnow", "light snow"),
  new WeatherSymbol(26, "snow", "moderate snow"),
  new WeatherSymbol(27, "heavysnow", "heavy snow"),
]

export function getWeatherSymbolById(id: number): WeatherSymbol | undefined {
  return weatherSymbols.find(symbol => symbol.id === id);
}

export function getWeatherSymbolBySymbolCode(symbolCode: string): WeatherSymbol | undefined {
  return weatherSymbols.find(symbol => symbol.symbolCode === symbolCode);
}
