import { Day } from "@/classes/day";
import { Hour } from "@/interfaces/hour";

export const getYRWeatherData = async ({ lat, lon }: { lat: string, lon: string }): Promise<Day> => {
  // const weatherData = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`).then(async (result) => {
  //   return result.json();
  // })

  const weatherData = await fetch(`yr.json`).then(async (result) => {
    return result.json();
  })

  let hours = [] as Hour[];
  weatherData.properties.timeseries.map((result: any) => {
    const hour: Hour = {
      temp: result.data.instant.details.air_temperature,
      // symbolCode: result.data.instant.details.symbol_code,
      time: result.time
    };
    hours.push(hour)
  })
  return new Day(hours);
}
