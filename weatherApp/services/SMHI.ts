import { getWeatherSymbolById } from "@/classes/weatherSymbol";
import { Day } from "@/classes/day";
import { Hour } from "@/interfaces/hour";

const baseUrl = "https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1";
export const getSMHIWeatherData = async ({ lat, lon }: { lat: string, lon: string }): Promise<Day> => {
  const weatherData = await fetch(`${baseUrl}/geotype/point/lon/${lon}/lat/${lat}/data.json`).then(async (result) => {
    return result.json();
  })

  let hours = [] as Hour[];
  weatherData.timeSeries.map((result: any) => {
    const weatherSymbol = getWeatherSymbolById(result.data.symbol_code);
    const date = new Date(result.intervalParametersStartTime);
    const hour: Hour = {
      temp: result.data.air_temperature,
      weatherSymbol: weatherSymbol,
      date: date
    };
    hours.push(hour);
  })

  return new Day(hours);
}
