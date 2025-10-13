import { Day } from "@/classes/day";
import { WeatherData } from "@/classes/weatherData";
import { getWeatherSymbolBySymbolCode } from "@/classes/weatherSymbol";
import { Hour } from "@/interfaces/hour";

export const getYRWeatherData = async ({ lat, lon }: { lat: number, lon: number }): Promise<WeatherData> => {
  const weatherData = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`, {
    headers: {
      "User-Agent": "weatherApp (https://github.com/JonasCeder/weatherApp)",
    },
  }).then(async (result) => {
    return result.json();
  })

  let hours = [] as Hour[];
  weatherData.properties.timeseries.map((result: any) => {
    const summary = result.data.next_1_hours?.summary ?? result.data.next_6_hours?.summary;
    if (summary === undefined) return;

    let symbolCode = summary.symbol_code;
    if (symbolCode !== undefined) {
      symbolCode = symbolCode.replace('_day', '').replace('_night', '');
    }

    const details = result.data.next_1_hours?.details ?? result.data.next_6_hours?.details;
    if (details === undefined) return;

    const probabilityOfPrecipitation = Math.ceil(details.probability_of_precipitation / 10) * 10;
    const weatherSymbol = getWeatherSymbolBySymbolCode(symbolCode);
    const date = new Date(result.time);
    const hour: Hour = {
      temp: result.data.instant.details.air_temperature,
      weatherSymbol: weatherSymbol,
      date: date,
      probabilityOfPrecipitation: probabilityOfPrecipitation,
      precipitationAmountMax: details.precipitation_amount_max,
      precipitationAmountMin: details.precipitation_amount_min
    };
    hours.push(hour)
  })
  return new WeatherData(hours);
}
