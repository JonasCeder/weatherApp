import { getWeatherSymbolById } from "@/classes/weatherSymbol";
import { WeatherData } from "@/classes/weatherData";
import { loadSMHIWeatherData, saveSMHIWeahterData, shouldReFetch } from "@/state/weatherDataState";
import { Hour } from "@/classes/hour";

const baseUrl = "https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1";

export const getSMHIWeatherData = async ({ lat, lon }: { lat: number, lon: number }): Promise<WeatherData | null> => {
  const cachedWeatherData = await loadSMHIWeatherData();
  if (shouldReFetch(cachedWeatherData, lat, lon)) {
    return await fetchWeatherData(lat, lon);
  }

  return cachedWeatherData;
};

const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const smhiWeatherData = await fetch(`${baseUrl}/geotype/point/lon/${lon}/lat/${lat}/data.json`).then(async (result) => {
    return result.json();
  })

  let hours = [] as Hour[];
  smhiWeatherData.timeSeries.map((result: any) => {
    const weatherSymbol = getWeatherSymbolById(result.data.symbol_code);
    const date = new Date(result.intervalParametersStartTime);
    const probabilityOfPrecipitation = Math.ceil(result.data.probability_of_precipitation / 10) * 10;
    const hour: Hour = {
      temp: result.data.air_temperature,
      weatherSymbol: weatherSymbol,
      date: date,
      probabilityOfPrecipitation: probabilityOfPrecipitation,
      precipitationAmountMax: result.data.precipitation_amount_max,
      precipitationAmountMin: result.data.precipitation_amount_min,
    };
    hours.push(hour);
  })

  const fetchTime = new Date();
  const weatherData = new WeatherData(hours, fetchTime, lat, lon);
  saveSMHIWeahterData({ hours, fetchTime, lat, lon });
  return weatherData;
}
