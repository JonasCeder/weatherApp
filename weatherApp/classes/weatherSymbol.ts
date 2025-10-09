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

const weatherSymbols = [
  new WeatherSymbol(1, "clearsky", "clear sky"),
  new WeatherSymbol(2, "fair", "nearly clear sky"),
  new WeatherSymbol(3, "fair", "variable cloudiness"),
  new WeatherSymbol(4, "partlycloudy", "halfclear sky"),
  new WeatherSymbol(5, "cloudy", "cloudy sky"),
  new WeatherSymbol(6, "cloudy", "overcast"),
  new WeatherSymbol(7, "fog", "fog"),
  new WeatherSymbol(8, "lightrainshowers", "light rain showers"),
  new WeatherSymbol(9, "rainshowers", "moderate rain showers"),
  new WeatherSymbol(10, "heavyrainshowers", "heavy rain showers"),
  new WeatherSymbol(11, "heavyrainshowersandthunder", "thunderstorm"),
  new WeatherSymbol(12, "lightsleetshowers", "light sleet showers"),
  new WeatherSymbol(13, "sleetshowers", "moderate sleet showers"),
  new WeatherSymbol(14, "heavysleetshowers", "heavy sleet showers"),
  new WeatherSymbol(15, "lightsnowshowers", "light snow showers"),
  new WeatherSymbol(16, "snowshowers", "moderate snow showers"),
  new WeatherSymbol(17, "heavysnowshowers", "heavy snow showers"),
  new WeatherSymbol(18, "lightrainshowers", "light rain"),
  new WeatherSymbol(19, "rainshowers", "moderate rain"),
  new WeatherSymbol(20, "heavyrainshowers", "heavy rain"),
  new WeatherSymbol(21, "rainandthunder", "thunder"),
  new WeatherSymbol(22, "lightsleetshowers", "light sleet"),
  new WeatherSymbol(23, "sleetshowers", "moderate sleet"),
  new WeatherSymbol(24, "heavysleetshowers", "heavy sleet"),
  new WeatherSymbol(25, "lightsnowshowers", "light snow"),
  new WeatherSymbol(26, "snowshowers", "moderate snow"),
  new WeatherSymbol(27, "heavysnowshowers", "heavy snow"),
]

export function getWeatherSymbolById(id: number): WeatherSymbol | undefined {
  return weatherSymbols.find(symbol => symbol.id === id);
}

export function getWeatherSymbolBySymbolCode(symbolCode: string): WeatherSymbol | undefined {
  return weatherSymbols.find(symbol => symbol.symbolCode === symbolCode);
}
