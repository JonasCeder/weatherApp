import { Hour } from "@/classes/hour"
import { WeatherData } from "./weatherData";

export class WeatherDataCache {
  hours: Hour[];
  fetchTime: Date;
  lat: number;
  lon: number;
  constructor(hours: Hour[], fetchTime: Date, lat: number, lon: number) {
    this.hours = hours;
    this.fetchTime = fetchTime;
    this.lat = lat;
    this.lon = lon;
  }

  static FromWeatherDataCache(weatherDataCache: WeatherDataCache): WeatherData {
    let hours = weatherDataCache.hours.map((hour) => {
      hour.date = new Date(hour.date);
      return hour;
    });

    return new WeatherData(hours, new Date(weatherDataCache.fetchTime), weatherDataCache.lat, weatherDataCache.lon);
  }

  static Parse(weatherDataCacheString: string): WeatherDataCache {
    const weatherDataCache = JSON.parse(weatherDataCacheString) as WeatherDataCache;
    weatherDataCache.fetchTime = new Date(weatherDataCache.fetchTime);
    weatherDataCache.hours = weatherDataCache.hours.map((hour) => {
      hour.date = new Date(hour.date);
      return hour;
    });

    return weatherDataCache;
  }
}
